/// <reference types="@cloudflare/workers-types" />

type Env = {
  PRODUCT_IMAGES: R2Bucket;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  R2_PUBLIC_BASE_URL: string;
  ALLOWED_ORIGINS?: string;
};

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const VALID_PURPOSES = new Set(["main", "gallery", "detail", "variant", "bundle", "category"]);

function isAllowedPreviewOrigin(origin: string) {
  try {
    const url = new URL(origin);
    if (
      url.protocol === "https:" &&
      url.hostname.endsWith("-tanjamall-store.ecomtanger1.workers.dev")
    ) {
      return true;
    }

    if (url.protocol !== "http:" || url.port !== "3000") return false;

    return (
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname.startsWith("192.168.") ||
      url.hostname.startsWith("10.") ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(url.hostname)
    );
  } catch {
    return false;
  }
}

function json(data: unknown, init: ResponseInit = {}) {
  return Response.json(data, {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init.headers
    }
  });
}

function corsHeaders(request: Request, env: Env) {
  const requestOrigin = request.headers.get("origin") ?? "";
  const allowedOrigins = (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const isExplicitlyAllowed = allowedOrigins.length === 0 || allowedOrigins.includes(requestOrigin);
  const allowOrigin = isExplicitlyAllowed || isAllowedPreviewOrigin(requestOrigin) ? requestOrigin || "*" : allowedOrigins[0] ?? "*";

  return {
    "access-control-allow-origin": allowOrigin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "authorization, content-type",
    "access-control-max-age": "86400",
    vary: "Origin"
  };
}

function withCors(response: Response, request: Request, env: Env) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(corsHeaders(request, env))) {
    headers.set(key, value);
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function safeSegment(value: string, fallback: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || fallback;
}

function createObjectKey({
  productId,
  purpose,
  fileName,
  adminUserId
}: {
  productId: string;
  purpose: string;
  fileName: string;
  adminUserId: string;
}) {
  const hasRecordId = Boolean(productId.trim());
  const safeProductId = safeSegment(productId, "unassigned");
  const safeAdminUserId = safeSegment(adminUserId, "admin");
  const safePurpose = safeSegment(purpose, "image");
  const safeName = safeSegment(fileName.replace(/\.[^.]+$/, ""), "image");
  const random = crypto.randomUUID();

  if (!hasRecordId) {
    return `admin-drafts/${safeAdminUserId}/${safePurpose}/${Date.now()}-${random}-${safeName}.webp`;
  }

  const root = purpose === "category" ? "categories" : "products";
  const folder = purpose === "category" ? "image" : safePurpose;

  return `${root}/${safeProductId}/${folder}/${Date.now()}-${random}-${safeName}.webp`;
}

async function getAdminUserId(request: Request, env: Env) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const userResponse = await fetch(`${env.SUPABASE_URL.replace(/\/+$/, "")}/auth/v1/user`, {
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      authorization
    }
  });

  if (!userResponse.ok) return null;
  const user = await userResponse.json<{ id?: string }>();
  if (!user.id) return null;

  const profileUrl = new URL(`${env.SUPABASE_URL.replace(/\/+$/, "")}/rest/v1/profiles`);
  profileUrl.searchParams.set("id", `eq.${user.id}`);
  profileUrl.searchParams.set("role", "eq.ADMIN");
  profileUrl.searchParams.set("select", "id");
  profileUrl.searchParams.set("limit", "1");

  const profileResponse = await fetch(profileUrl, {
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      authorization,
      accept: "application/json"
    }
  });

  if (!profileResponse.ok) return null;
  const profiles = await profileResponse.json<Array<{ id: string }>>();

  return profiles.length ? user.id : null;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return withCors(new Response(null, { status: 204 }), request, env);
    }

    if (request.method !== "POST") {
      return withCors(json({ error: "Method not allowed." }, { status: 405 }), request, env);
    }

    const adminUserId = await getAdminUserId(request, env);
    if (!adminUserId) {
      return withCors(json({ error: "Admin authorization is required." }, { status: 401 }), request, env);
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const productId = String(formData.get("productId") ?? "");
    const purpose = String(formData.get("purpose") ?? "main");

    if (!(file instanceof File)) {
      return withCors(json({ error: "Image file is required." }, { status: 400 }), request, env);
    }

    if (!VALID_PURPOSES.has(purpose)) {
      return withCors(json({ error: "Invalid image purpose." }, { status: 400 }), request, env);
    }

    if (file.size > MAX_IMAGE_BYTES) {
      return withCors(json({ error: "Image is too large." }, { status: 413 }), request, env);
    }

    if (file.type !== "image/webp") {
      return withCors(json({ error: "Only compressed WebP images are accepted." }, { status: 415 }), request, env);
    }

    const key = createObjectKey({ productId, purpose, fileName: file.name, adminUserId });
    const object = await env.PRODUCT_IMAGES.put(key, file.stream(), {
      httpMetadata: {
        contentType: "image/webp",
        cacheControl: "public, max-age=31536000, immutable"
      },
      customMetadata: {
        uploadedBy: adminUserId,
        originalName: file.name,
        purpose
      }
    });

    const baseUrl = env.R2_PUBLIC_BASE_URL.replace(/\/+$/, "");

    return withCors(
      json({
        key,
        url: `${baseUrl}/${key}`,
        size: object?.size ?? file.size
      }),
      request,
      env
    );
  }
} satisfies ExportedHandler<Env>;

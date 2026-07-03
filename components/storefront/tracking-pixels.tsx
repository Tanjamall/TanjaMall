"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import type { StoreSettings } from "@/lib/storefront/types";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      page?: () => void;
    };
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function normalizeMetaPixelId(value: string | null) {
  const candidate = value?.trim();
  return candidate && /^[0-9]{5,40}$/.test(candidate) ? candidate : null;
}

function normalizeTikTokPixelId(value: string | null) {
  const candidate = value?.trim();
  return candidate && /^[A-Za-z0-9_-]{4,80}$/.test(candidate) ? candidate : null;
}

function normalizeGoogleTagManagerId(value: string | null) {
  const candidate = value?.trim().toUpperCase();
  return candidate && /^GTM-[A-Z0-9]+$/.test(candidate) ? candidate : null;
}

function metaPixelCode(pixelId: string) {
  const safeId = JSON.stringify(pixelId);
  return `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', ${safeId});
    fbq('track', 'PageView');
  `;
}

function tikTokPixelCode(pixelId: string) {
  const safeId = JSON.stringify(pixelId);
  return `
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;
      var ttq=w[t]=w[t]||[];
      ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
      ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
      for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
      ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
      ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";
      ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;
      ttq._o=ttq._o||{};ttq._o[e]=n||{};
      n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src=r+"?sdkid="+e+"&lib="+t;
      e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
      ttq.load(${safeId});
      ttq.page();
    }(window, document, 'ttq');
  `;
}

function googleTagManagerCode(containerId: string) {
  const safeId = JSON.stringify(containerId);
  return `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',${safeId});
  `;
}

export function TrackingPixels({ settings }: { settings: StoreSettings }) {
  const pathname = usePathname();
  const hasMounted = useRef(false);
  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/admin-preview");
  const metaPixelId = !isAdminRoute && settings.meta_pixel_enabled ? normalizeMetaPixelId(settings.meta_pixel_id) : null;
  const tikTokPixelId = !isAdminRoute && settings.tiktok_pixel_enabled ? normalizeTikTokPixelId(settings.tiktok_pixel_id) : null;
  const googleTagManagerId = !isAdminRoute && settings.google_tag_manager_enabled
    ? normalizeGoogleTagManagerId(settings.google_tag_manager_id)
    : null;

  useEffect(() => {
    if (isAdminRoute) return;
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    window.fbq?.("track", "PageView");
    window.ttq?.page?.();
    window.dataLayer?.push({
      event: "virtual_page_view",
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href
    });
  }, [isAdminRoute, pathname]);

  if (isAdminRoute || (!metaPixelId && !tikTokPixelId && !googleTagManagerId)) {
    return null;
  }

  return (
    <>
      {googleTagManagerId ? (
        <>
          <Script id="tanjamall-google-tag-manager" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: googleTagManagerCode(googleTagManagerId) }} />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(googleTagManagerId)}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      ) : null}

      {metaPixelId ? (
        <>
          <Script id="tanjamall-meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: metaPixelCode(metaPixelId) }} />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${encodeURIComponent(metaPixelId)}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}

      {tikTokPixelId ? (
        <Script id="tanjamall-tiktok-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: tikTokPixelCode(tikTokPixelId) }} />
      ) : null}
    </>
  );
}

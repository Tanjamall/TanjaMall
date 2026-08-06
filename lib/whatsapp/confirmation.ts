type WhatsAppOrderMessageInput = {
  storeName: string;
  customerPhone: string;
  customerName: string;
  orderNumber: string;
  lines: Array<{
    name: string;
    quantity: number;
  }>;
  total: number;
  address: string;
};

export function normalizeWhatsAppRecipient(phone: string) {
  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = `212${digits.slice(1)}`;
  if (/^[5-7]\d{8}$/.test(digits)) digits = `212${digits}`;

  return digits;
}

export function retargetWhatsAppConfirmationUrl(url: string | null, customerPhone: string) {
  const recipient = normalizeWhatsAppRecipient(customerPhone);
  if (!recipient) return "";

  if (!url) return `https://wa.me/${recipient}`;

  try {
    const parsed = new URL(url);
    return `https://wa.me/${recipient}${parsed.search}`;
  } catch {
    return `https://wa.me/${recipient}`;
  }
}

export function buildWhatsAppConfirmationUrl(input: WhatsAppOrderMessageInput) {
  const recipient = normalizeWhatsAppRecipient(input.customerPhone);
  const products = input.lines.map((line) => `- ${line.name} x${line.quantity}`).join("\n");
  const message = [
    `Salam ${input.customerName}, hna ${input.storeName}.`,
    `توصلنا بالطلب ديالك رقم ${input.orderNumber}:`,
    "",
    products,
    "",
    `المجموع: ${input.total} درهم`,
    `العنوان: ${input.address}`,
    "",
    "واش كتأكد الطلب باش نوجهوه ليك؟"
  ].join("\n");

  return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
}

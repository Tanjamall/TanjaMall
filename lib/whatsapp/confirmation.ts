type WhatsAppOrderMessageInput = {
  storeName: string;
  whatsappNumber: string;
  customerName: string;
  orderNumber: string;
  lines: Array<{
    name: string;
    quantity: number;
  }>;
  total: number;
  address: string;
};

export function buildWhatsAppConfirmationUrl(input: WhatsAppOrderMessageInput) {
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

  return `https://wa.me/${input.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

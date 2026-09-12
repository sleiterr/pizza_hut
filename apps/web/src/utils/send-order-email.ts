export async function sendOrderEmail(
  email: string,
  orderId: string,
  orderTotal: number,
  items: {
    name: string;
    quantity: number;
    price: number;
    discountPrice?: number;
    imageUrl?: string;
  }[],
  deliveryMethod: "courier" | "pickup",
  deliveryAddress: string,
) {
  const response = await fetch("/api/send-order-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      orderId,
      orderTotal,
      items,
      deliveryMethod,
      deliveryAddress,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    const errorMsg = result?.error || "Failed to send order email";
    throw new Error(errorMsg);
  }

  console.log(`Email sent to ${email}`);
  return { success: true };
}

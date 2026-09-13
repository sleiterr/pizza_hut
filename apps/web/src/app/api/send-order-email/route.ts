import { Resend } from "resend";

// resend client instance for sending emails
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  type OrderItem = {
    name: string;
    quantity: number;
    price: number;
    discountPrice?: number;
    imageUrl?: string;
  };

  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { success: false, error: "RESEND_API_KEY is not configured" },
      { status: 500 },
    );
  }

  try {
    // extract email, orderId, and orderTotal from the request body
    const {
      email,
      orderId,
      orderTotal,
      items,
      deliveryMethod,
      deliveryAddress,
    } = await req.json();
    const typedItems: OrderItem[] = items;

    if (!email || !orderId || typeof orderTotal !== "number") {
      return Response.json(
        { success: false, error: "Invalid request payload" },
        { status: 400 },
      );
    }

    // Generate the HTML for the order items
    let itemsHtml = "";
    if (typedItems && typedItems.length > 0) {
      itemsHtml = typedItems
        .map((item) => {
          const price = item.discountPrice ?? item.price;

          return `
             <div style="display: flex; gap: 15px; margin: 15px 0; padding: 10px; border: 1px solid #eee; border-radius: 8px;">
              ${
                item.imageUrl
                  ? `<img src="${item.imageUrl}" alt="${item.name}" style="width: 80px; height: 80px; border-radius: 8px; object-fit: cover;">`
                  : ""
              }
              <div style="flex: 1; padding-left: 10px;">
                <p style="margin: 0; font-weight: bold; color: #333;">${item.name}</p>
                <p style="margin: 5px 0; color: #666; font-size: 14px;">Qty: ${item.quantity}</p>
                <p style="margin: 5px 0; color: #f3274c; font-weight: bold;">$${(price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
              `;
        })
        .join("");
    }

    let deliveryHtml = "";
    if (deliveryMethod === "courier") {
      deliveryHtml = `
        <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #4caf50;">
          <p style="margin: 0; font-weight: bold; color: #333;">🛵 Delivery Address</p>
          <p style="margin: 10px 0 0 0; color: #666;">${deliveryAddress}</p>
          <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">Estimated: 25-35 minutes</p>
        </div>
      `;
    } else {
      deliveryHtml = `
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ffc107;">
          <p style="margin: 0; font-weight: bold; color: #333;">🏪 Pick Up</p>
          <p style="margin: 10px 0 0 0; color: #666;">Ready in 15 minutes</p>
        </div>
      `;
    }

    const { data, error } = await resend.emails.send({
      from: "orders@resend.dev", // from: email address from which the email is sent
      to: email,
      subject: `Order Confirmation #${orderId.slice(0, 8).toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f3274c;">Thank you for your order! 🎉</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Order ID:</strong> #${orderId.slice(0, 8).toUpperCase()}</p>
            <p><strong>Order Total:</strong> $${orderTotal.toFixed(2)}</p>
            <p><strong>Status:</strong> 🟡 Pending</p>
          </div>

          ${itemsHtml ? `<h3 style="color: #333;">Your Items:</h3>${itemsHtml}` : ""}
          ${deliveryHtml}

          <p>We are preparing your food! 🍔</p>
          <p style="color: #999; font-size: 12px;">Estimated delivery: 25-35 minutes</p>
            
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">Questions? Contact us at support@pizza.com</p>
        </div>
    `,
    });

    if (error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 502 },
      );
    }

    return Response.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}

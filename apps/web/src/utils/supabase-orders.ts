import { supabase } from "@/utils/supabase";
import type { CartItem } from "@/store/cartStore";
import type { Order, OrderItem } from "@/types/order";

export async function createOrder(
  customerEmail: string,
  customerPhone: string,
  deliveryAddress: string,
  items: CartItem[],
  total: number,
  deliveryFee: number,
) {
  // Calculate subtotal by subtracting delivery fee from total
  const subtotal = total - deliveryFee;

  // Create the order in the "orders" table
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        customer_email: customerEmail,
        customer_phone: customerPhone,
        delivery_address: deliveryAddress,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        status: "pending",
      },
    ])
    .select()
    .single();

  // If the order was created successfully, create the order items in the "order_items" table
  if (orderError || !order) {
    console.error("Error creating order:", orderError);
    throw new Error("Failed to create order");
  }

  const orderItems: OrderItem[] = items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.name,
    price: item.price,
    discount_price: item.discountPrice,
    quantity: item.quantity,
    rating: item.rating,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
  }

  return order;
}

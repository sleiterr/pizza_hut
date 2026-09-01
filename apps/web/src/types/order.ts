// type for order customer data
export type Order = {
  id?: string;
  create_at?: string;
  customer_email?: string;
  customer_phone?: string;
  delivery_address?: string;
  subtotal?: number;
  delivery_fee?: number;
  total?: number;
  notes?: string;
  delivery_method?: "courier" | "pickup";
  promo_code?: string;
  promo_discount?: number;
  status?: "pending" | "preparing" | "delivery" | "completed";
};

// type for order item data
export type OrderItem = {
  id?: string;
  order_id?: string;
  product_id?: string;
  product_name?: string;
  price?: number;
  discount_price?: number;
  quantity?: number;
  rating?: number;
};

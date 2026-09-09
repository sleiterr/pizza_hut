"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import SectionPage from "@/components/Section/SectionPage";
import Link from "next/link";

type Order = {
  id: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  subtotal: number;
  delivery_fee: number;
  total: number;
  promo_discount: number;
  delivery_method: string;
  created_at: string;
};

type OrderItem = {
  product_name: string;
  quantity: number;
  price: number;
  discount_price: number | null;
  image_url: string | null;
};

export default function ConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  const orderNum = order?.id
    ? order.id.replace(/-/g, "").slice(0, 8).toUpperCase()
    : "------";

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const [orderResponse, itemsResponse] = await Promise.all([
          supabase.from("orders").select("*").eq("id", orderId).single(),
          supabase.from("order_items").select("*").eq("order_id", orderId),
        ]);

        const { data: orderData, error: orderError } = orderResponse;
        const { data: itemsData, error: itemsError } = itemsResponse;

        if (orderError) throw orderError;

        if (itemsError) throw itemsError;

        setOrder(orderData);
        setOrderItems(itemsData || []);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <SectionPage classSection="bg-bg-cart min-h-screen">
        <div className="text-center py-20">
          <p className="font-heading text-2xl text-quaternary">
            Loading your order...
          </p>
        </div>
      </SectionPage>
    );
  }

  if (!order) {
    return (
      <SectionPage classSection="bg-bg-cart min-h-screen">
        <div className="text-center py-20">
          <p className="font-heading text-2xl text-quaternary">
            Order not found
          </p>
          <Link
            href="/cart"
            className="mt-4 inline-block text-tertiary hover:underline font-semibold"
          >
            Back to Cart
          </Link>
        </div>
      </SectionPage>
    );
  }

  return (
    <SectionPage classSection="bg-bg-cart min-h-screen">
      <div className="w-full flex flex-col items-center gap-6 py-4">
        <div
          className="w-24 h-24 rounded-full bg-discount-price flex items-center justify-center text-5xl"
          style={{
            animation:
              "confirm-pop 0.5s cubic-bezier(0.36,0.07,0.19,0.97) both",
          }}
        >
          🎉
        </div>

        <div className="text-center">
          <h1 className="font-heading text-5xl text-quaternary mb-2">
            Order Placed!
          </h1>
          <p className="text-quinary text-base font-normal">
            Thank you! We are preparing your food 🍔
          </p>
        </div>

        <div className="bg-primary border-2 border-border-btn text-center rounded-2xl px-8 py-4 w-full max-w-sm">
          <p className="text-quinary text-xs uppercase tracking-widest">
            Order Number
          </p>
          <p className="font-heading text-discount-price text-[36px] mt-1">
            #{orderNum}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
          <div className="bg-cart-bg border-2 border-discount-price rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border-btn">
              <p className="font-heading text-lg text-quaternary">Your Order</p>
            </div>

            <div className="max-h-48 overflow-y-auto">
              {orderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-5 py-3 border-b border-border-btn last:border-0"
                >
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.product_name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  )}
                  <span className="flex-1 text-sm text-quinary">
                    {item.product_name} × {item.quantity}
                  </span>
                  <span className="font-heading text-sm text-quaternary">
                    $
                    {(
                      (item.discount_price ?? item.price) * item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-5 py-3 bg-primary border-t border-border-btn">
              <div className="flex justify-between items-center">
                <span className="font-heading text-quaternary">Total:</span>
                <span className="font-heading text-2xl">
                  <span className="text-tertiary">$</span>
                  <span className="text-quaternary">
                    {order.total.toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-cart-bg border-2 border-checkout-border rounded-2xl p-5">
            <h3 className="font-heading text-lg text-quaternary mb-3">
              Delivery Details
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <div>
                <p className="text-quinary mb-1">Email</p>
                <p className="font-semibold text-quaternary">
                  {order.customer_email}
                </p>
              </div>
              <div>
                <p className="text-quinary mb-1">Phone</p>
                <p className="font-semibold text-quaternary">
                  {order.customer_phone}
                </p>
              </div>
              <div>
                <p className="text-quinary mb-1">Address</p>
                <p className="font-semibold text-quaternary">
                  {order.delivery_address}
                </p>
              </div>
              {order.delivery_method === "courier" && (
                <div className="flex items-center gap-3 pt-3 border-t border-border-btn">
                  <span className="text-3xl">🛵</span>
                  <div>
                    <p className="font-heading text-quaternary text-base">
                      Courier Delivery
                    </p>
                    <p className="text-discount-price font-heading text-xs">
                      Estimated: 25–35 min
                    </p>
                  </div>
                </div>
              )}
              {order.delivery_method === "pickup" && (
                <div className="flex items-center gap-3 pt-3 border-t border-border-btn">
                  <span className="text-3xl">🏪</span>
                  <div>
                    <p className="font-heading text-quaternary text-base">
                      Pick Up
                    </p>
                    <p className="text-discount-price font-heading text-xs">
                      Ready in 15 min
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="bg-tertiary text-white font-heading px-8 py-3 rounded-lg hover:bg-secondary transition-colors"
        >
          Back to Menu
        </Link>
      </div>

      <style>{`
        @keyframes confirm-pop {
          0%  { transform: scale(0) rotate(-20deg); opacity: 0; }
          70% { transform: scale(1.2) rotate(6deg); }
          100%{ transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </SectionPage>
  );
}

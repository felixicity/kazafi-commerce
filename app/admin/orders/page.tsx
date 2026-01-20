"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
// import { OrdersTable } from "@/components/features/admin/orders/orders-table";
import { getAllOrders } from "@/lib/mutations/order";

const OrdersTable = dynamic(
      () => import("@/components/features/admin/orders/orders-table").then((mod) => mod.OrdersTable),
      {
            ssr: false,
            loading: () => <p>Loading Table...</p>, // Optional: shows while the JS loads
      },
);

export default function AdminOrders() {
      const {
            data: ordersData,
            error,
            isLoading,
      } = useQuery({
            queryKey: ["orders"],
            queryFn: getAllOrders,
      });

      return (
            <div className="px-6 py-4">
                  <h1 className="font-semibold text-xl">Orders</h1>
                  <section>
                        <OrdersTable data={ordersData} />
                  </section>
            </div>
      );
}

"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
// import { OrdersTable } from "@/components/features/admin/orders/orders-table";
import { getAllPayments } from "@/lib/mutations/payment";

const PaymentsTable = dynamic(
      () => import("@/components/features/admin/payments/payments-table").then((mod) => mod.PaymentsTable),
      {
            ssr: false,
            loading: () => <p>Loading Table...</p>, // Optional: shows while the JS loads
      }
);

export default function AdminPayments() {
      const {
            data: paymentsData,
            error,
            isLoading,
      } = useQuery({
            queryKey: ["payments"],
            queryFn: getAllPayments,
      });

      return (
            <div className="px-6 py-4">
                  <h1 className="font-semibold text-xl">Payments</h1>
                  <section>
                        <PaymentsTable data={paymentsData} />
                  </section>
            </div>
      );
}

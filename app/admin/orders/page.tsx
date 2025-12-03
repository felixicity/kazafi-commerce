import { OrdersTable } from "@/components/features/admin/orders/orders-table";

export default function AdminOrders() {
      return (
            <div className="px-6 py-4">
                  <h1 className="font-semibold text-xl">Orders</h1>
                  <section>
                        <OrdersTable />
                  </section>
            </div>
      );
}

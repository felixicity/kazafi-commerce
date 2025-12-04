import { OrdersTable } from "@/components/features/admin/orders/orders-table";

export default function AdminOrders() {
      return (
            <div className="px-6 py-4">
                  <h1 className="font-semibold text-xl">Orders</h1>
                  <section>
                        <OrdersTable data={ordersData} />
                  </section>
            </div>
      );
}

const ordersData = [
      {
            id: "ij4499Ig6k3ik30000",
            customer: "Chukwu Felix",
            payment: "paid",
            shipping: "delivered",
            createdAt: "02-05-2025T13:25",
      },
      {
            id: "ij4499Ii093j3ik9090",
            customer: "Oriakhi Dickson",
            payment: "failed",
            shipping: "pending",
            createdAt: "02-05-2025T13:25",
      },
      {
            id: "ij4499Ig6k3ik30000",
            customer: "Oriakhi Dickson",
            payment: "paid",
            shipping: "processing",
            createdAt: "02-05-2025T13:25",
      },
];

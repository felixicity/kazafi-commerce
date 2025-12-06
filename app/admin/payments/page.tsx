import { PaymentsTable } from "@/components/features/admin/payments/payments-table";

export default function AdminPayments() {
      return (
            <div className="px-6 py-4">
                  <h1 className="font-semibold text-xl">Payments</h1>
                  <section>
                        <PaymentsTable data={paymentsData} />
                  </section>
            </div>
      );
}

const paymentsData = [
      {
            id: "ij4499Ig3ik30000",
            order: "k3m4k53dmm932",
            type: "charge",
            amount: "$95000",
            createdAt: "02-05-2025T13:25",
            email: "chukwufelix16@gmail.com",
            method: "bank transfer",
            status: "paid",
      },
      {
            id: "ij4499I3ik3dr0g0",
            order: "k3m4k52rri34m932",
            type: "charge",
            amount: "$3200",
            createdAt: "02-05-2025T13:25",
            email: "oriakhidickson.com",
            method: "bank transfer",
            status: "unpaid",
      },
];

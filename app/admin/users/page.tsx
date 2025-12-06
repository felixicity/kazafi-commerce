import { CustomersTable } from "@/components/features/admin/customers/customers-table";

const customersData = [
      {
            id: "ri4i4m945940jgwigm",
            name: "Chukwu Felix",
            email: "chukwufelix16@gmail.com",
            createdAt: "02-07-2025",
            role: "Admin",
            status: "active",
            login: "05-12-2025",
      },
      {
            id: "ri4i4eok30230jgwigm",
            name: "Morrison Nwokedi",
            email: "nwokediMorrison@gmail.com",
            createdAt: "28-09-2025",
            role: "customer",
            status: "active",
            login: "15-10-2025",
      },
];

export default function AdminCustomers() {
      return (
            <div className="px-6 py-4">
                  <h1 className="font-semibold text-xl">Customers</h1>
                  <section>
                        <CustomersTable data={customersData} />
                  </section>
            </div>
      );
}

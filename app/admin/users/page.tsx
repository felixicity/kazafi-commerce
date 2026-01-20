import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CustomersTable, IdealCustomer } from "@/components/features/admin/customers/customers-table";

const customersData: IdealCustomer[] = [
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
                  <div className="flex items-center justify-between">
                        <h1 className="font-semibold text-xl">Customers</h1>
                        <Button asChild variant="link" className="bg-blue-500 text-white rounded-md">
                              <Link href="./users/create">Create user</Link>
                        </Button>
                  </div>
                  <section>
                        <CustomersTable data={customersData} />
                  </section>
            </div>
      );
}

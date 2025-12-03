import type { Metadata } from "next";
import { DashboardWrapper } from "@/components/features/client/dashboardWrapper"; // Import the client wrapper

export const metadata: Metadata = {
      title: "Dashboard",
      // ...other metadata
};

export default function RootLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      return (
            <div className="min-h-screen">
                  {/* The interactive layout wrapper is now a Client Component */}
                  <DashboardWrapper>{children}</DashboardWrapper>
            </div>
      );
}

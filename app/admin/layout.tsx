import { Metadata } from "next";
import { AdminSidebar } from "@/components/features/admin/admin-sidebar";
import { AdminHeader } from "@/components/features/admin/admin-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
      title: "Admin",
      // ...other metadata
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
      return (
            <SidebarProvider
                  style={
                        {
                              "--sidebar-width": "calc(var(--spacing) * 72)",
                              "--header-height": "calc(var(--spacing) * 12)",
                        } as React.CSSProperties
                  }
            >
                  <AdminSidebar variant="inset" />
                  <SidebarInset>
                        <AdminHeader />
                        {children}
                  </SidebarInset>
            </SidebarProvider>
      );
}

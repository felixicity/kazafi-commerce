import { Metadata } from "next";
import { AppSidebar } from "@/components/features/app2-sidebar";
import { SiteHeader } from "@/components/features/site-header";
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
                  <AppSidebar variant="inset" />
                  <SidebarInset>
                        <SiteHeader />
                        {children}
                  </SidebarInset>
            </SidebarProvider>
      );
}

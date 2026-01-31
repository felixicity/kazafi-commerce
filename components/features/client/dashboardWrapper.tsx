"use client";

import { useState, createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { IconMenu } from "@tabler/icons-react";
import { Sidebar } from "@/components/features/sidebar";
import { DashboardSection } from "@/lib/types";
import { fetchUserDetails } from "@/lib/mutations/users";
import { Spinner } from "@/components/ui/spinner";

const DashboardContext = createContext<{
      userData: { name?: string; email: string };
      activeSection: DashboardSection;
} | null>(null);

export function useDashboard() {
      const context = useContext(DashboardContext);
      if (!context) throw new Error("useDashboard must be used within DashboardWrapper");
      return context;
}

export function DashboardWrapper({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      const router = useRouter();
      const [activeSection, setActiveSection] = useState<DashboardSection>("overview");

      const {
            data: userData,
            isFetching,
            isError,
      } = useQuery({
            queryKey: ["user"],
            queryFn: fetchUserDetails,
      });

      if (isFetching) {
            <div>
                  <Spinner />
            </div>;
      }

      const handleNavClick = (section: DashboardSection) => {
            setActiveSection(section);
            router.push(`/dashboard/${section}`);
      };

      return (
            <DashboardContext.Provider value={{ userData, activeSection }}>
                  <>
                        {/* Mobile Header/Menu Toggle */}
                        <header className="lg:hidden p-4 bg-white shadow-md flex justify-between items-center sticky top-0 z-20">
                              <h1 className="text-xl font-bold text-gray-900">Your Dashboard</h1>

                              <Sheet>
                                    <SheetTrigger asChild>
                                          <Button variant="ghost" size="icon">
                                                <IconMenu size={24} />
                                          </Button>
                                    </SheetTrigger>

                                    <SheetContent side="left">
                                          <Sidebar handleNavClick={handleNavClick} activeSection={activeSection} />
                                    </SheetContent>
                              </Sheet>
                        </header>

                        {/* Desktop Layout */}
                        <div className="lg:grid lg:grid-cols-[280px_1fr] min-h-screen">
                              {/* Sidebar (Desktop) */}
                              <aside className="hidden lg:block bg-white border-r border-gray-100 shadow-xl sticky top-0 h-screen overflow-y-auto">
                                    <Sidebar handleNavClick={handleNavClick} activeSection={activeSection} />
                              </aside>
                              {/* Main Content Area */}
                              {children}
                        </div>
                  </>
            </DashboardContext.Provider>
      );
}

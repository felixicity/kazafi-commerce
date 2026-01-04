"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { IconMenu, IconX } from "@tabler/icons-react";
import { Sidebar } from "@/components/features/sidebar";
import { DashboardSection } from "@/lib/types";

export function DashboardWrapper({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      const router = useRouter();
      const [activeSection, setActiveSection] = useState<DashboardSection>("overview");

      const handleNavClick = (section: DashboardSection) => {
            setActiveSection(section);
            router.push(`/dashboard/${section}`);
      };

      return (
            <>
                  {/* Mobile Header/Menu Toggle */}
                  <header className="lg:hidden p-4 bg-white shadow-md flex justify-between items-center sticky top-0 z-20">
                        <h1 className="text-xl font-bold text-gray-900">Customer Dashboard</h1>

                        <Sheet>
                              <SheetTrigger>
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
      );
}

"use client";

import { useMutation } from "@tanstack/react-query";
import { Separator } from "../ui/separator";
import NavLink from "./nav-link";
import { IconLogout } from "@tabler/icons-react";
import { Button } from "../ui/button";
import {
      IconMessage,
      IconPaywall,
      IconHistory,
      IconTicket,
      IconLayoutDashboard,
      IconSettings,
} from "@tabler/icons-react";
import { DashboardSection } from "@/lib/types";
import { logoutUser } from "@/lib/mutations/users";
import { useRouter } from "next/navigation";

interface SidebarProps {
      handleNavClick: (section: DashboardSection) => void;
      activeSection: DashboardSection;
}

export const Sidebar = ({ handleNavClick, activeSection }: SidebarProps) => {
      const router = useRouter();

      const { mutate } = useMutation({
            mutationKey: ["user"],
            mutationFn: logoutUser,
      });

      const NavItems = [
            { id: ".", label: "Dashboard Overview", icon: <IconLayoutDashboard /> },
            { id: "orders", label: "Order History", icon: <IconHistory /> },
            { id: "coupons", label: "Saved Coupons", icon: <IconTicket /> },
            { id: "messages", label: "Messages", icon: <IconMessage /> },
            { id: "profile", label: "Profile", icon: <IconPaywall /> },
            { id: "settings", label: "Account Settings", icon: <IconSettings /> },
      ];

      const handleLogout = () => {
            mutate();
            router.push("/");
      };

      return (
            <nav className="p-6 space-y-4">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                        <h2 className="text-xl font-bold text-gray-900">Kazafi</h2>
                  </div>

                  <div className="space-y-1 pt-2">
                        {NavItems.map((item) => (
                              <NavLink
                                    key={item.id}
                                    icon={item.icon}
                                    label={item.label}
                                    active={activeSection === item.id}
                                    onClick={() => handleNavClick(item.id as DashboardSection)}
                              />
                        ))}
                  </div>

                  <Separator className="mt-8!" />
                  <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={handleLogout}
                  >
                        <IconLogout size={20} className="mr-3" />
                        <span className="font-semibold text-sm">Sign Out</span>
                  </Button>
            </nav>
      );
};

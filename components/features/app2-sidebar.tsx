"use client";
import { useState } from "react";
import {
      IconCamera,
      IconChartBar,
      IconDashboard,
      IconDatabase,
      IconFileAi,
      IconFileDescription,
      IconFolder,
      IconInnerShadowTop,
      IconListDetails,
      IconReport,
      IconSearch,
      IconSettings,
      IconTag,
      IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/features/nav-documents";
import { NavMain } from "@/components/features/nav-main";
import { NavSecondary } from "@/components/features/nav-secondary";
import { NavUser } from "@/components/features/nav-user";
import {
      Sidebar,
      SidebarContent,
      SidebarFooter,
      SidebarHeader,
      SidebarMenu,
      SidebarMenuButton,
      SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
      user: {
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
      },
      navMain: [
            {
                  title: "Dashboard",
                  url: "/admin",
                  icon: IconDashboard,
            },
            {
                  title: "Products",
                  url: "/admin/products",
                  icon: IconTag,
            },
            {
                  title: "Orders",
                  url: "/admin/orders",
                  icon: IconFolder,
            },
            {
                  title: "Customers",
                  url: "/admin/users/",
                  icon: IconFolder,
            },
            {
                  title: "Payments",
                  url: "/admin/payments",
                  icon: IconFolder,
            },
            {
                  title: "Analytics",
                  url: "/admin/analytics",
                  icon: IconChartBar,
            },
      ],
      navClouds: [
            {
                  title: "Capture",
                  icon: IconCamera,
                  isActive: true,
                  url: "#",
                  items: [
                        {
                              title: "Active Proposals",
                              url: "#",
                        },
                        {
                              title: "Archived",
                              url: "#",
                        },
                  ],
            },
            {
                  title: "Proposal",
                  icon: IconFileDescription,
                  url: "#",
                  items: [
                        {
                              title: "Active Proposals",
                              url: "#",
                        },
                        {
                              title: "Archived",
                              url: "#",
                        },
                  ],
            },
            {
                  title: "Prompts",
                  icon: IconFileAi,
                  url: "#",
                  items: [
                        {
                              title: "Active Proposals",
                              url: "#",
                        },
                        {
                              title: "Archived",
                              url: "#",
                        },
                  ],
            },
      ],
      navSecondary: [
            {
                  title: "Settings",
                  url: "#",
                  icon: IconSettings,
            },
            {
                  title: "Search",
                  url: "#",
                  icon: IconSearch,
            },
      ],
      documents: [
            {
                  name: "Reports",
                  url: "#",
                  icon: IconReport,
            },
            {
                  name: "Promotions & Coupons",
                  url: "#",
                  icon: IconUsers,
            },
            {
                  name: "Messages",
                  url: "#",
                  icon: IconUsers,
            },
      ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
      const [active, setActive] = useState("/admin");

      return (
            <Sidebar collapsible="offcanvas" {...props}>
                  <SidebarHeader>
                        <SidebarMenu>
                              <SidebarMenuItem className="flex justify-between">
                                    <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
                                          <a href="#">
                                                <IconInnerShadowTop className="size-5!" />
                                                <span className="text-base font-semibold">Kazafi</span>
                                          </a>
                                    </SidebarMenuButton>
                              </SidebarMenuItem>
                        </SidebarMenu>
                  </SidebarHeader>
                  <SidebarContent>
                        <NavMain items={data.navMain} active={active} setActive={setActive} />
                        <NavDocuments items={data.documents} />
                        <NavSecondary items={data.navSecondary} className="mt-auto" />
                  </SidebarContent>
                  <SidebarFooter>
                        <NavUser user={data.user} />
                  </SidebarFooter>
            </Sidebar>
      );
}

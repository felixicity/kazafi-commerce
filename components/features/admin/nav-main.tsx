import Link from "next/link";
import { type Icon } from "@tabler/icons-react";
import {
      SidebarGroup,
      SidebarGroupContent,
      SidebarMenu,
      SidebarMenuButton,
      SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
      items,
      active,
      setActive,
}: {
      items: {
            title: string;
            url: string;
            icon?: Icon;
      }[];
      active: string;
      setActive: (value: string) => void;
}) {
      return (
            <SidebarGroup>
                  <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                              {items.map((item) => (
                                    <SidebarMenuItem
                                          key={item.title}
                                          onClick={() => setActive(item.url)}
                                          className={
                                                active === item.url
                                                      ? " bg-[#5a31f4] hover:bg-[#4c29cc] text-white rounded-md"
                                                      : ""
                                          }
                                    >
                                          <Link href={item.url}>
                                                <SidebarMenuButton tooltip={item.title}>
                                                      {item.icon && <item.icon />}
                                                      <span>{item.title}</span>
                                                </SidebarMenuButton>
                                          </Link>
                                    </SidebarMenuItem>
                              ))}
                        </SidebarMenu>
                  </SidebarGroupContent>
            </SidebarGroup>
      );
}

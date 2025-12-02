import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IconBell } from "@tabler/icons-react";

export function SiteHeader() {
      return (
            <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
                  <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                        <h1 className="text-base font-medium">Overview</h1>
                        <div className="relative ml-auto flex items-center gap-2">
                              <span className="sr-only">Notification</span>
                              <IconBell size={30} stroke="1.25px" />
                              {2 > 0 && (
                                    <span className="absolute -top-1 -right-1.5 h-5 w-5 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center">
                                          {2}
                                    </span>
                              )}
                        </div>
                  </div>
            </header>
      );
}

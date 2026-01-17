import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { InputGroupAddon, InputGroupInput, InputGroup } from "../../ui/input-group";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Sheet, SheetHeader, SheetTrigger, SheetTitle, SheetDescription, SheetContent } from "@/components/ui/sheet";

export function AdminHeader() {
      return (
            <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
                  <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                        <h1 className="text-base font-medium">Admin</h1>
                        <div className="relative w-xs ml-auto flex items-center gap-2 mr-8">
                              <InputGroup>
                                    <InputGroupInput placeholder="Search..." />
                                    <InputGroupAddon>
                                          <SearchIcon />
                                    </InputGroupAddon>
                              </InputGroup>
                              {2 > 0 && (
                                    <Sheet>
                                          <SheetTrigger>
                                                <span className="sr-only">Notification</span>
                                                <IconBell size={30} stroke="1.25px" />
                                                <span className="absolute -top-1 -right-1.5 h-5 w-5 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center">
                                                      {2}
                                                </span>
                                          </SheetTrigger>
                                          <SheetContent>
                                                <SheetHeader>
                                                      <SheetTitle>notifications</SheetTitle>
                                                      <SheetDescription>read-only messages</SheetDescription>
                                                </SheetHeader>
                                          </SheetContent>
                                    </Sheet>
                              )}
                        </div>
                  </div>
            </header>
      );
}

"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { MenuIcon, User2Icon } from "lucide-react";
import { InputGroup, InputGroupText, InputGroupAddon, InputGroupInput } from "../../ui/input-group";
import AjaxCartSheet from "./ajax-cart";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { fetchUserDetails } from "@/lib/mutations/users";

const navItems = [
      { name: "Tables", href: "./" },
      { name: "Chairs", href: "./shop" },
      { name: "Sofas", href: "./shop" },
      { name: "Artworks", href: "./shop" },
      { name: "Wardrobes", href: "./shop" },
      { name: "Consoles", href: "./shop" },
];

export function Navigation() {
      const [index, setIndex] = useState(0);

      const isMobile = useIsMobile();

      const { data: userData, isSuccess } = useQuery({
            queryKey: ["user"],
            queryFn: fetchUserDetails,
      });

      useEffect(() => {
            const timer = setInterval(() => {
                  setIndex((prevIndex) => (prevIndex + 1) % navItems.length);
            }, 3000); // Changes every 3 seconds

            return () => clearInterval(timer); // Cleanup on unmount
      }, []);

      return (
            <header className="bg-background pt-2 sm:px-4 sticky top-0 z-50 w-full">
                  <div className="mx-auto 3xl:fixed:px-0 lg:px-18">
                        <div className="3xl:fixed:container flex h-18 items-center **:data-[slot=separator]:h-4! gap-4 lg:justify-between">
                              <button
                                    data-slot="popover-trigger"
                                    className="whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:text-accent-foreground px-4 py-2 has-[>svg]:px-3 extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent flex lg:hidden"
                                    type="button"
                                    aria-haspopup="dialog"
                                    aria-expanded="false"
                                    aria-controls="radix-_R_2pf6lb_"
                                    data-state="closed"
                              >
                                    <div className="relative flex h-8 w-4 items-center justify-center">
                                          <span className="sr-only">Toggle Menu</span>
                                          <Sheet>
                                                <SheetTrigger>
                                                      <div>
                                                            <MenuIcon size={40} />
                                                      </div>
                                                </SheetTrigger>
                                                <SheetContent className="py-12 px-4 ">
                                                      {navItems.map((item) => (
                                                            <SheetClose
                                                                  key={item.name}
                                                                  className="flex flex-col gap-4 justify-start hover:bg-gray-300 p-2"
                                                            >
                                                                  <Link href={item.href}>{item.name}</Link>
                                                            </SheetClose>
                                                      ))}
                                                </SheetContent>
                                          </Sheet>
                                    </div>
                              </button>
                              <Link href="/" className="lg:hidden">
                                    <span className="text-2xl font-black italic tracking-tighter">Kazafi</span>
                              </Link>
                              <Link
                                    data-slot="button"
                                    className="items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hidden size-8 lg:flex"
                                    href="/"
                              >
                                    <span className="text-3xl font-black italic tracking-tighter">Kazafi</span>
                                    <span className="sr-only">kazafi</span>
                              </Link>
                              <nav className="items-center hidden lg:flex">
                                    {navItems.map((item) => (
                                          <Link
                                                key={item.name}
                                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3 has-[&gt;svg]:px-2.5"
                                                data-slot="button"
                                                href={item.href}
                                          >
                                                {item.name}
                                          </Link>
                                    ))}
                              </nav>
                              <div className="flex gap-4 mr-2 items-center ">
                                    <InputGroup className=" lg:max-w-90">
                                          <InputGroupAddon>
                                                <InputGroupText className="text-[14px]">search for </InputGroupText>
                                          </InputGroupAddon>
                                          <InputGroupInput
                                                placeholder={navItems[index].name}
                                                className="pl-0.5 text-sm"
                                          />
                                    </InputGroup>

                                    <Link
                                          href={isSuccess ? "./dashboard" : "./login"}
                                          className="flex items-center gap-0.5 hover:cursor-pointer hover:bg-gray-200 lg:rounded-2xl "
                                    >
                                          <span className="sr-only">User profile</span>
                                          <User2Icon size={isMobile ? 27 : 38} />
                                          {!isMobile &&
                                                (userData ? (
                                                      <span className="text-xs font-semibold max-w-15">
                                                            Orders & Account
                                                      </span>
                                                ) : (
                                                      <span className="text-xs font-semibold max-w-15">
                                                            login / signup
                                                      </span>
                                                ))}
                                    </Link>
                                    <AjaxCartSheet />
                              </div>
                        </div>
                  </div>
            </header>
      );
}

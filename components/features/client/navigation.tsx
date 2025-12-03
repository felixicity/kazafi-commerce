import Link from "next/link";
import { IconShoppingBag } from "@tabler/icons-react";
import { User2Icon } from "lucide-react";
import { InputGroup, InputGroupText, InputGroupAddon, InputGroupInput } from "../../ui/input-group";
import AjaxCartSheet from "./ajax-cart";

const navItems = [
      { name: "Men", href: "./docs" },
      { name: "Women", href: "./blocks" },
      { name: "Accessories", href: "./components" },
      { name: "Kids", href: "./charts" },
      { name: "Beauty", href: "./colors" },
      { name: "Shoes", href: "./colors" },
      { name: "Furniture", href: "./colors" },
];

export function Navigation({ openCart, setOpenCart }: { openCart: boolean; setOpenCart: (open: boolean) => void }) {
      //   const showCart = () => {
      //         // Implement cart display logic here
      //         setOpenCart(!openCart);
      //   };

      return (
            <header className="bg-background pt-2 sticky top-0 z-50 w-full">
                  <div className="mx-auto 3xl:fixed:px-0 lg:px-18">
                        <div className="3xl:fixed:container flex h-18 items-center **:data-[slot=separator]:h-4! justify-between">
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
                                          <div className="relative size-4">
                                                <span className="bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100 top-1"></span>
                                                <span className="bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100 top-2.5"></span>
                                          </div>
                                          <span className="sr-only">Toggle Menu</span>
                                    </div>
                                    <span className="text-3xl font-black italic tracking-tighter">Kazafi</span>
                              </button>
                              <Link
                                    data-slot="button"
                                    className="items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hidden size-8 lg:flex"
                                    href="/"
                              >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="size-5">
                                          <rect width="256" height="256" fill="none"></rect>
                                          <line
                                                x1="208"
                                                y1="128"
                                                x2="128"
                                                y2="208"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="32"
                                          ></line>
                                          <line
                                                x1="64"
                                                y1="40"
                                                x2="192"
                                                y2="168"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="32"
                                          ></line>
                                          <line
                                                x1="192"
                                                y1="40"
                                                x2="40"
                                                y2="192"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="32"
                                          ></line>
                                    </svg>
                                    <span className="sr-only">shadcn/ui</span>
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

                              <div className="flex gap-5 items-center">
                                    <InputGroup className="max-w-90">
                                          <InputGroupAddon>
                                                <InputGroupText>search for </InputGroupText>
                                          </InputGroupAddon>
                                          <InputGroupInput placeholder="shirts" className="pl-0.5" />
                                    </InputGroup>

                                    <Link href="./profile">
                                          <span className="sr-only">User profile</span>
                                          <User2Icon size={28} />
                                    </Link>
                                    <AjaxCartSheet openCart={openCart} setOpenCart={setOpenCart} />
                              </div>
                        </div>
                  </div>
            </header>
      );
}

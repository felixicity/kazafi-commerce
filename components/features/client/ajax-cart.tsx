// AjaxCartSheet.tsx (The main component)
"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { IconShoppingBag, IconLoader } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
      Sheet,
      SheetContent,
      SheetHeader,
      SheetTitle,
      SheetTrigger,
      SheetFooter,
      SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { fetchCartItems } from "../../../lib/mutations/cart"; // Use the abstracted fetcher
import CartItemComponent from "../cartItem"; // Use the new item component
import { CartItem } from "../../../lib/types"; // Use the types

export default function AjaxCartSheet() {
      // 1. Fetch Cart Data
      const { data, error, isLoading } = useQuery({
            queryKey: ["cart"],
            queryFn: fetchCartItems,
      });

      // 2. Derive State
      const items: CartItem[] = data?.cart?.items || [];

      const subtotal = new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
      }).format(items.reduce((acc, item) => acc + (item.variation?.price || 0) * item.quantity, 0));
      const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
      const uniqueItemsCount = items.length;

      if (error) {
            console.error("Error fetching cart data:", error);
            // A simple error message can be displayed
      }

      const cartContent = isLoading ? (
            <div className="flex h-full flex-col items-center justify-center space-y-2 text-muted-foreground">
                  <IconLoader className="h-8 w-8 animate-spin text-blue-500" />
                  <p>Loading cart...</p>
            </div>
      ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-2 text-muted-foreground">
                  <IconShoppingBag className="h-12 w-12 opacity-20" />
                  <p>Your cart is empty</p>
            </div>
      ) : (
            <div className="space-y-6">
                  {items.map((item) => (
                        <CartItemComponent key={item._id} item={item} />
                  ))}
            </div>
      );

      return (
            <Sheet>
                  <SheetTrigger asChild>
                        <div className="relative cursor-pointer">
                              <span className="sr-only">Cart</span>
                              <IconShoppingBag size={38} stroke="1.25px" />
                              {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1.5 h-5 w-5 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center">
                                          {itemCount}
                                    </span>
                              )}
                        </div>
                  </SheetTrigger>

                  <SheetContent side="right" className="w-full px-8 sm:max-w-md flex flex-col h-full">
                        <SheetHeader className="space-y-2.5 pr-6">
                              <SheetTitle>Your Cart ({itemCount})</SheetTitle>
                              <Separator />
                        </SheetHeader>

                        {/* SCROLLABLE BODY */}
                        <div className="flex-1 overflow-y-auto py-4">{cartContent}</div>

                        {/* STICKY FOOTER */}
                        {items.length > 0 && (
                              <SheetFooter className="mt-auto sm:flex-col sm:space-y-4">
                                    <Separator />
                                    <div className="space-y-1.5 pt-4">
                                          <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Shipping</span>
                                                <span>Calculated at checkout</span>
                                          </div>
                                          <div className="flex justify-between font-bold text-lg">
                                                <span>Total</span>
                                                <span>{subtotal}</span>
                                          </div>
                                    </div>

                                    <SheetClose asChild>
                                          <Button
                                                asChild
                                                className="w-full bg-[#5a31f4] hover:bg-[#4c29cc] transition-colors rounded-md py-3 flex items-center justify-center shadow-sm h-auto"
                                          >
                                                <Link href="/checkout"> Checkout</Link>
                                          </Button>
                                    </SheetClose>
                                    {uniqueItemsCount > 2 && (
                                          <SheetClose asChild>
                                                <Button
                                                      asChild
                                                      className="w-full bg-black hover:bg-transparent hover:border-black hover:border-2 hover:text-black transition-colors rounded-md py-3 flex items-center justify-center shadow-sm h-auto"
                                                >
                                                      <Link href="/cart"> View cart</Link>
                                                </Button>
                                          </SheetClose>
                                    )}
                              </SheetFooter>
                        )}
                  </SheetContent>
            </Sheet>
      );
}

"use client";

import { useState } from "react";
// import { ShoppingCart, Trash2, Plus, Minus, Loader2 } from "lucide-react";
// import { IconShoppingBag, Trash, Plus, Minus, Loader2 } from "lucide-react";
import { IconShoppingBag, IconTrash, IconPlus, IconMinus, IconLoader } from "@tabler/icons-react";
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
import { Separator } from "@/components/ui/separator"; // Optional: npx shadcn-ui@latest add separator

// Mock type for Cart Item
interface CartItem {
      id: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
}

export default function AjaxCartSheet() {
      // Simulate Cart State (In a real app, use Zustand, Redux, or React Context)
      const [items, setItems] = useState<CartItem[]>([
            { id: "1", name: "Wireless Headphones", price: 120.0, quantity: 1, image: "/placeholder-1.jpg" },
            { id: "2", name: "Mechanical Keyboard", price: 250.5, quantity: 1, image: "/placeholder-2.jpg" },
      ]);
      const [isLoading, setIsLoading] = useState<string | null>(null); // Stores ID of item being updated

      // Derived state
      const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

      // Simulate AJAX update
      const handleQuantityChange = async (id: string, delta: number) => {
            setIsLoading(id);
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 500));

            setItems(
                  (prev) =>
                        prev
                              .map((item) => {
                                    if (item.id === id) {
                                          return { ...item, quantity: Math.max(0, item.quantity + delta) };
                                    }
                                    return item;
                              })
                              .filter((item) => item.quantity > 0) // Remove if quantity 0
            );
            setIsLoading(null);
      };

      return (
            <Sheet>
                  <SheetTrigger asChild>
                        <div className="relative">
                              <span className="sr-only">Cart</span>
                              <IconShoppingBag size={38} stroke="1.25px" />
                              {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1.5 h-5 w-5 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center">
                                          {itemCount}
                                    </span>
                              )}
                        </div>
                  </SheetTrigger>

                  {/* side="right" creates the standard cart slide-in */}
                  <SheetContent side="right" className="w-full px-8 sm:max-w-md flex flex-col h-full">
                        {/* HEADER */}
                        <SheetHeader className="space-y-2.5 pr-6">
                              <SheetTitle>Your Cart ({itemCount})</SheetTitle>
                              <Separator />
                        </SheetHeader>

                        {/* SCROLLABLE BODY */}
                        {/* flex-1 and overflow-y-auto ensures only this section scrolls */}
                        <div className="flex-1 overflow-y-auto py-4">
                              {items.length === 0 ? (
                                    <div className="flex h-full flex-col items-center justify-center space-y-2 text-muted-foreground">
                                          <IconShoppingBag className="h-12 w-12 opacity-20" />
                                          <p>Your cart is empty</p>
                                    </div>
                              ) : (
                                    <div className="space-y-6">
                                          {items.map((item) => (
                                                <div key={item.id} className="flex gap-4">
                                                      {/* Image Placeholder */}
                                                      <div className="h-20 w-20 rounded-md border bg-gray-100 shrink-0" />

                                                      <div className="flex flex-1 flex-col justify-between">
                                                            <div className="flex justify-between">
                                                                  <h3 className="font-medium text-sm">{item.name}</h3>
                                                                  <p className="font-bold text-sm">
                                                                        ${(item.price * item.quantity).toFixed(2)}
                                                                  </p>
                                                            </div>

                                                            <div className="flex items-center justify-between mt-2">
                                                                  <div className="flex items-center gap-2 border rounded-md p-1">
                                                                        <Button
                                                                              variant="ghost"
                                                                              size="icon"
                                                                              className="h-6 w-6"
                                                                              disabled={isLoading === item.id}
                                                                              onClick={() =>
                                                                                    handleQuantityChange(item.id, -1)
                                                                              }
                                                                        >
                                                                              <IconMinus className="h-3 w-3" />
                                                                        </Button>

                                                                        <span className="text-sm w-4 text-center">
                                                                              {isLoading === item.id ? (
                                                                                    <IconLoader className="h-3 w-3 animate-spin mx-auto" />
                                                                              ) : (
                                                                                    item.quantity
                                                                              )}
                                                                        </span>

                                                                        <Button
                                                                              variant="ghost"
                                                                              size="icon"
                                                                              className="h-6 w-6"
                                                                              disabled={isLoading === item.id}
                                                                              onClick={() =>
                                                                                    handleQuantityChange(item.id, 1)
                                                                              }
                                                                        >
                                                                              <IconPlus className="h-3 w-3" />
                                                                        </Button>
                                                                  </div>

                                                                  <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                                                        onClick={() =>
                                                                              handleQuantityChange(item.id, -100)
                                                                        } // Force remove
                                                                  >
                                                                        <IconTrash className="h-4 w-4" />
                                                                  </Button>
                                                            </div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              )}
                        </div>

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
                                                <span>${subtotal.toFixed(2)}</span>
                                          </div>
                                    </div>

                                    <SheetClose asChild>
                                          <Button className="w-full bg-[#5a31f4] hover:bg-[#4c29cc] transition-colors rounded-md py-3 flex items-center justify-center shadow-sm h-auto">
                                                Checkout
                                          </Button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                          <Button className="w-full hover:bg-[#4b4b4b] transition-colors rounded-md py-3 flex items-center justify-center shadow-sm h-auto">
                                                Continue as guest
                                          </Button>
                                    </SheetClose>
                              </SheetFooter>
                        )}
                  </SheetContent>
            </Sheet>
      );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter } from "@/components/ui/card";
import { fetchCartItems } from "@/lib/mutations/cart";
import { IconPlus, IconMinus, IconCaretDown, IconCaretUp } from "@tabler/icons-react";
import {
      Drawer,
      DrawerTrigger,
      DrawerContent,
      DrawerTitle,
      DrawerDescription,
      DrawerClose,
      DrawerHeader,
} from "@/components/ui/drawer";

export default function Cart() {
      // Simulate Cart State (In a real app, use Zustand, Redux, or React Context)

      const { data, error, isLoading } = useQuery({
            queryKey: ["cart"],
            queryFn: fetchCartItems,
      });

      const cartItems = data?.cart?.items || [];
      // Derived state
      const subtotal = new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
      }).format(cartItems.reduce((acc, item) => acc + (item.variation?.price || 0) * item.quantity, 0));

      // Simulate AJAX update
      const handleQuantityChange = async (id: string, delta: number) => {
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 500));
      };

      if (isLoading) return <p>Loading products...</p>;
      if (error) return <p>Something went wrong!</p>;

      let cartItemsListing;
      if (cartItems.length === 0) {
            cartItemsListing = (
                  <>
                        <h2>Your Shopping Cart is Empty!</h2> <button>Check Our Collections</button>
                  </>
            );
      } else {
            // getCart.cart.items.product
            cartItemsListing = cartItems.map((item) => (
                  <Card key={item.variation._id} className="  mb-4 flex-row justify-between">
                        <CardContent className="flex gap-4">
                              {item.variation?.imageURLs?.[0] && (
                                    <Image
                                          src={item.variation.imageURLs[0]}
                                          alt={item.product?.name || "Product"}
                                          width={500}
                                          height={500}
                                          className="w-34 object-cover rounded-md"
                                    />
                              )}

                              <div className="flex flex-col gap-2">
                                    <p className="font-semibold text-lg">{item.product?.name}</p>
                                    <div className="">
                                          <span
                                                style={{ backgroundColor: `${item.variation?.color}` }}
                                                className="w-8 h-8 rounded-full block"
                                          ></span>
                                          {item.variation?.color}
                                    </div>

                                    <p className="text-orange-500 font-medium tex`t-lg">
                                          {new Intl.NumberFormat("en-NG", {
                                                style: "currency",
                                                currency: "NGN",
                                          }).format(item?.variation.price || 0)}
                                    </p>
                              </div>
                        </CardContent>
                        <CardFooter>
                              <CardAction className="flex flex-col justify-between items-center gap-8">
                                    <Button>
                                          <Link href="/remove"> Remove</Link>
                                    </Button>
                                    <div className="flex items-center justify-between mt-2">
                                          <div className="flex items-center gap-2 border rounded-md p-1">
                                                <Button
                                                      variant="ghost"
                                                      size="icon"
                                                      className="h-6 w-6"
                                                      disabled={item.quantity === 1}
                                                      onClick={() => handleQuantityChange(item._id, -1)}
                                                >
                                                      <IconMinus className="h-3 w-3" />
                                                </Button>

                                                <span className="text-sm w-4 text-center">{item.quantity}</span>

                                                <Button
                                                      variant="ghost"
                                                      size="icon"
                                                      className="h-6 w-6"
                                                      //   disabled={item._id}
                                                      onClick={() => handleQuantityChange(item._id, 1)}
                                                >
                                                      <IconPlus className="h-3 w-3" />
                                                </Button>
                                          </div>
                                    </div>
                              </CardAction>
                        </CardFooter>
                  </Card>
            ));
      }

      return (
            <div className="grid grid-cols-5 lg:gap-12 py-4 px-8 lg:py-12 lg:px-32">
                  <div className="col-span-full lg:col-span-3">
                        <header>
                              <h2 className="font-bold text-2xl">Cart({cartItems.length})</h2>
                        </header>
                        <hr className="my-4" />
                        <div className="cart-items-list">{cartItemsListing}</div>
                  </div>
                  {cartItems.length && (
                        <>
                              <aside className="hidden col-span-2 bg-gray-50 p-6 rounded-lg h-fit self-start sticky top-0 lg:block ">
                                    <header>
                                          <h2 className="font-bold text-lg">Order summary</h2>
                                    </header>
                                    <hr className="my-4" />
                                    <p className="sales-tax-info">
                                          The sales tax is calculated when you select shipping address at checkout.
                                    </p>
                                    <div className="flex justify-between mt-2">
                                          <p>My Cart ({cartItems.length} item)</p> <span>{subtotal}</span>
                                    </div>

                                    <div className="flex justify-between mt-2">
                                          <p>Import duties</p>{" "}
                                          <span>
                                                {new Intl.NumberFormat("en-NG", {
                                                      style: "currency",
                                                      currency: "NGN",
                                                }).format(1800)}
                                          </span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg mt-4">
                                          <p>Total (exluding shipping fee):</p>
                                          <span>{subtotal}</span>
                                    </div>
                                    <Button asChild className="bg-black w-full mt-4">
                                          <Link href="./checkout">Proceed to checkout</Link>
                                    </Button>
                              </aside>

                              <Drawer>
                                    <div className="sticky bottom-0 left-0 right-0 bg-white h-20 flex justify-between items-center col-span-full lg:hidden mb-4">
                                          <DrawerTrigger className=" col-span-full lg:hidden w-full ">
                                                <div className="flex items-center">
                                                      {subtotal}
                                                      <IconCaretUp />
                                                </div>
                                          </DrawerTrigger>
                                          <Button asChild className="bg-black w-60 ml-4">
                                                <Link href="./checkout">Checkout ({cartItems.length})</Link>
                                          </Button>
                                    </div>
                                    <DrawerContent className="bg-gray-50 p-6 rounded-lg h-fit self-start">
                                          <DrawerHeader>
                                                <DrawerTitle>Price details</DrawerTitle>
                                                <DrawerDescription>
                                                      The sales tax is calculated when you select shipping address at
                                                      checkout.
                                                </DrawerDescription>
                                          </DrawerHeader>
                                          <div className="flex justify-between mt-2">
                                                <p>My Cart ({cartItems.length} item)</p> <span>{subtotal}</span>
                                          </div>

                                          <div className="flex justify-between mt-2">
                                                <p>Import duties</p>{" "}
                                                <span>
                                                      {new Intl.NumberFormat("en-NG", {
                                                            style: "currency",
                                                            currency: "NGN",
                                                      }).format(1800)}
                                                </span>
                                          </div>
                                          <div className="flex justify-between font-bold text-lg mt-4">
                                                <p>Total (exluding shipping fee):</p>
                                                <span>{subtotal}</span>
                                          </div>

                                          <DrawerDescription>
                                                Please refer to your final actual payment at checkout.
                                          </DrawerDescription>

                                          <DrawerClose>
                                                <div className="flex justify-between items-center col-span-full lg:hidden mt-6">
                                                      <DrawerTrigger className=" col-span-full lg:hidden w-full ">
                                                            <div className="flex items-center">
                                                                  {subtotal}
                                                                  <IconCaretDown />
                                                            </div>
                                                      </DrawerTrigger>
                                                      <Button asChild className="bg-black w-60 ml-4">
                                                            <Link href="./checkout">Checkout ({cartItems.length})</Link>
                                                      </Button>
                                                </div>
                                          </DrawerClose>
                                    </DrawerContent>
                              </Drawer>
                        </>
                  )}
            </div>
      );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconPlus, IconMinus, IconLoader } from "@tabler/icons-react";
import { Card, CardAction, CardContent, CardFooter } from "@/components/ui/card";
import { SingleProduct } from "@/lib/types";
import { MOCK_PRODUCT_SINGLE } from "@/lib/store/cart-store";
import { User } from "lucide-react";

interface CartItem {
      id: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
}

export default function Cart() {
      // Simulate Cart State (In a real app, use Zustand, Redux, or React Context)

      const [items, setItems] = useState("");
      const [isLoading, setIsLoading] = useState<string | null>(null); // Stores ID of item being updated

      // Derived state
      const subtotal = items.reduce((acc, item) => acc + item.pric * item.quantity, 0);
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

      if (isLoading) return <p>Loading products...</p>;
      //   if (error) return <p>Something went wrong!</p>;

      // If your API returns { products: [...] }
      const cart = data?.cart ?? {};
      const cartItems = cart.items ?? [];
      //   console.log(cart)

      //   let cartItemsList;
      //   if (cartItems.product === "") {
      //         cartItemsList = (
      //               <>
      //                     <h2>Your Shopping Cart is Empty!</h2> <button>Check Our Collections</button>
      //               </>
      //         );
      //   } else {
      //         // getCart.cart.items.product
      //         cartItemsList = cartItems.map((item) => (
      //               <Card className="cart-product" key={item.variation._id}>
      //                     <CardContent>
      //                           <div className="cart-product-details">
      //                                 <div>
      //                                       <img src={item.variation?.imageURLs[0]} alt={item.product?.name} />
      //                                 </div>
      //                                 <div className="details">
      //                                       <p className="product-name">{item.product?.name}</p>
      //                                       <div className="chosen-product-color">
      //                                             <span style={{ backgroundColor: `${item.variation?.hexCode}` }}></span>
      //                                             {item.variation?.color}
      //                                       </div>
      //                                 </div>
      //                                 <div>
      //                                       <p className="product-price">&#8358;{item.variation.price}</p>
      //                                 </div>
      //                           </div>
      //                     </CardContent>
      //                     <CardFooter>
      //                           <CardAction>
      //                                 <Button>
      //                                       <Link> Remove</Link>
      //                                 </Button>
      //                                <div className="flex items-center justify-between mt-2">
      //                                                               <div className="flex items-center gap-2 border rounded-md p-1">
      //                                                                     <Button
      //                                                                           variant="ghost"
      //                                                                           size="icon"
      //                                                                           className="h-6 w-6"
      //                                                                           disabled={isLoading === item.id}
      //                                                                           onClick={() =>
      //                                                                                 handleQuantityChange(item.id, -1)
      //                                                                           }
      //                                                                     >
      //                                                                           <IconMinus className="h-3 w-3" />
      //                                                                     </Button>

      //                                                                     <span className="text-sm w-4 text-center">
      //                                                                           {isLoading === item.id ? (
      //                                                                                 <IconLoader className="h-3 w-3 animate-spin mx-auto" />
      //                                                                           ) : (
      //                                                                                 item.quantity
      //                                                                           )}
      //                                                                     </span>

      //                                                                     <Button
      //                                                                           variant="ghost"
      //                                                                           size="icon"
      //                                                                           className="h-6 w-6"
      //                                                                           disabled={isLoading === item.id}
      //                                                                           onClick={() =>
      //                                                                                 handleQuantityChange(item.id, 1)
      //                                                                           }
      //                                                                     >
      //                                                                           <IconPlus className="h-3 w-3" />
      //                                                                     </Button>
      //                                                               </div>
      //                                             </div>
      //                           </CardAction>
      //                     </CardFooter>
      //               </Card>
      //         ));
      //   }

      return (
            <div className="shopping-cart wrapper">
                  <div className="cart-items">
                        <header>
                              <h2>Shopping cart</h2> <span>{cartItems.length} items</span>
                        </header>
                        <hr />
                        {/* {cartItemsList} */}
                  </div>
                  {cartItems.length && (
                        <aside className="order-summary">
                              <header>
                                    <h2>Order summary</h2>
                              </header>
                              <hr />
                              <p className="sales-tax-info">
                                    The sales tax is calculated when you select shipping address at checkout.
                              </p>
                              <div className="order-detail">
                                    <p>My Cart ({cartItems.length} item)</p> <span>&#8358;{cart.totalAmount}</span>
                              </div>

                              <div className="order-detail">
                                    <p>Import duties</p> <span>-- &#8358; 1800</span>
                              </div>
                              <label htmlFor="promo" id="promo-label">
                                    Add promotional code
                              </label>
                              <div className="promo-code">
                                    <input id="promo" type="text" placeholder="Discount code in giftcard" />
                                    <button>Apply</button>
                              </div>
                              <div className="order-detail order-total">
                                    <p>
                                          Total (exluding <br /> shipping fee):
                                    </p>
                                    <span>&#8358; {cart.totalAmount}</span>
                              </div>
                              <Button asChild variant="link">
                                    <Link href="./checkout">Proceed to checkout</Link>
                              </Button>
                        </aside>
                  )}
            </div>
      );
}

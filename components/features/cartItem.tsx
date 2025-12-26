// CartItemComponent.tsx
"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconTrash, IconPlus, IconMinus, IconLoader } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "../../lib/types";
import { updateCartItemQuantity } from "../../lib/mutations/cart"; // Import the mutation function
import Image from "next/image";

interface CartItemProps {
      item: CartItem;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
      const queryClient = useQueryClient();

      // The unique ID for the item is key for optimistic updates and loading state
      const itemId = item.variation._id;

      // Use a mutation hook for quantity updates
      const { mutate, isPending } = useMutation({
            mutationFn: updateCartItemQuantity,

            // --- Optimistic Update ---
            onMutate: async ({ quantity }) => {
                  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                  await queryClient.cancelQueries({ queryKey: ["cart"] });

                  // Snapshot the previous value
                  const previousCart: any = queryClient.getQueryData(["cart"]);

                  // Optimistically update the cart data
                  queryClient.setQueryData(["cart"], (oldData: any) => {
                        if (!oldData) return oldData;

                        const updatedItems = oldData.cart.items
                              .map((cartItem: CartItem) => {
                                    if (cartItem.variation._id === itemId) {
                                          // Apply the delta to the quantity
                                          return { ...cartItem, quantity: Math.max(0, cartItem.quantity + quantity) };
                                    }
                                    return cartItem;
                              })
                              // Filter out items where quantity is 0 (or less, but Math.max prevents less than 0)
                              .filter((cartItem: CartItem) => cartItem.quantity > 0);

                        return {
                              ...oldData,
                              cart: {
                                    ...oldData.cart,
                                    items: updatedItems,
                              },
                        };
                  });

                  // Return a context object with the snapshot value
                  return { previousCart };
            },

            // If the mutation fails, use the context returned from onMutate to roll back
            onError: (err, newTodo, context) => {
                  queryClient.setQueryData(["cart"], context?.previousCart);
                  console.error("Failed to update cart quantity:", err);
                  // Optionally: show a toast/notification
            },

            // Always re-fetch after error or success to ensure client state matches server state
            onSettled: () => {
                  queryClient.invalidateQueries({ queryKey: ["cart"] });
            },
      });

      // Check if the product array is structured as expected and get the name
      const currentQuantity = item.quantity;
      const imageUrl =
            item.variation?.imageURLs && item.variation.imageURLs.length > 0
                  ? item.variation?.imageURLs[0]
                  : "/placeholder-image.png";
      const productName = item.product?.name || "Unknown Product";
      const itemPrice = new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
      }).format(item.variation?.price || 0);
      const subtotal = new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
      }).format(item.variation?.price || 0 * currentQuantity);

      const handleUpdate = (delta: number) => {
            // You might add checks here (e.g., if delta is -1 and quantity is 1, maybe call a removal mutation instead)
            let quantity = currentQuantity;
            console.log("delta:", delta);
            console.log("quantity:", quantity);
            if (delta === 0) return;
            if (delta === -1 && quantity > 1) {
                  quantity -= 1;
                  console.log("quantityMinus:", quantity);
                  return mutate({ itemId, quantity });
            }
            if (delta === 1) {
                  quantity += 1;
                  console.log("quantityPlus:", quantity);
                  return mutate({ itemId, quantity });
            }
            if (delta === -1 && quantity === 1) {
                  return mutate({ itemId, delta: quantity });
            }
      };

      const handleRemove = () => {
            // Pass a large delta to ensure removal based on your logic, or a specific delete API call
            // For simplicity, we use the update function with a large delta.
            handleUpdate(-item.quantity);
      };

      // Loading state logic
      const showLoader = isPending;

      return (
            <div className="flex gap-4">
                  {/* Image Placeholder */}
                  <div className="h-20 w-20 rounded-md border shrink-0">
                        <Image src={imageUrl} alt={productName} className="w-full" width={80} height={80} />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                        {/* Name and Price */}
                        <div className="flex justify-between">
                              <h3 className="font-medium text-sm">{productName}</h3>
                              <p className="font-bold text-sm">{subtotal}</p>
                        </div>

                        {/* Quantity Controls and Remove Button */}
                        <div className="flex items-center justify-between mt-2">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2 border rounded-md p-1">
                                    <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                          disabled={showLoader || currentQuantity <= 1} // Disable when quantity is 1 or less
                                          onClick={() => handleUpdate(-1)}
                                    >
                                          <IconMinus className="h-3 w-3" />
                                    </Button>

                                    <span className="text-sm w-4 text-center">
                                          {showLoader ? (
                                                <IconLoader className="h-3 w-3 animate-spin mx-auto text-blue-500" />
                                          ) : (
                                                currentQuantity
                                          )}
                                    </span>

                                    <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                          disabled={showLoader}
                                          onClick={() => handleUpdate(1)}
                                    >
                                          <IconPlus className="h-3 w-3" />
                                    </Button>
                              </div>

                              {/* Remove Button (IconTrash) */}
                              <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                    disabled={showLoader}
                                    onClick={handleRemove}
                              >
                                    <IconTrash className="h-4 w-4" />
                              </Button>
                        </div>
                  </div>
            </div>
      );
};

export default CartItemComponent;

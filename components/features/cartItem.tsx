"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconTrash, IconPlus, IconMinus, IconLoader } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "../../lib/types";
import { updateCartItemQuantity, removeCartItem } from "../../lib/mutations/cart";
import Image from "next/image";

// Define the shape of your Cart response for better typing
interface CartData {
      cart: {
            items: CartItem[];
            // Add other fields like totalAmount if they exist
      };
}

const CartItemComponent = ({ item }: { item: CartItem }) => {
      const queryClient = useQueryClient();
      const itemId = item.variation._id;

      // --- Mutation for Quantity Updates ---
      const { mutate, isPending } = useMutation({
            mutationFn: updateCartItemQuantity,
            onMutate: async ({ quantity }) => {
                  await queryClient.cancelQueries({ queryKey: ["cart"] });
                  const previousCart = queryClient.getQueryData<CartData>(["cart"]);

                  queryClient.setQueryData<CartData>(["cart"], (oldData) => {
                        if (!oldData) return oldData;
                        const updatedItems = oldData.cart.items
                              .map((cartItem) => {
                                    if (cartItem.variation._id === itemId) {
                                          // Note: item.quantity is the CURRENT quantity,
                                          // the optimistic update should reflect the new total
                                          return { ...cartItem, quantity: quantity };
                                    }
                                    return cartItem;
                              })
                              .filter((cartItem) => cartItem.quantity > 0);

                        return {
                              ...oldData,
                              cart: { ...oldData.cart, items: updatedItems },
                        };
                  });

                  return { previousCart };
            },
            onError: (err, variables, context) => {
                  if (context?.previousCart) {
                        queryClient.setQueryData(["cart"], context.previousCart);
                  }
                  console.error("Failed to update cart quantity:", err);
            },
            onSettled: () => {
                  queryClient.invalidateQueries({ queryKey: ["cart"] });
            },
      });

      // --- Mutation for Removing Items ---
      const { mutate: removeItemMutation, isPending: isRemoving } = useMutation({
            // Fixed: mutationFn needs to accept an object or the ID directly
            mutationFn: (id: string) => removeCartItem(id),
            onMutate: async () => {
                  await queryClient.cancelQueries({ queryKey: ["cart"] });
                  const previousCart = queryClient.getQueryData<CartData>(["cart"]);

                  queryClient.setQueryData<CartData>(["cart"], (oldData) => {
                        if (!oldData) return oldData;
                        const updatedItems = oldData.cart.items.filter((cartItem) => cartItem.variation._id !== itemId);
                        return {
                              ...oldData,
                              cart: { ...oldData.cart, items: updatedItems },
                        };
                  });

                  return { previousCart };
            },
            onError: (err, variables, context) => {
                  if (context?.previousCart) {
                        queryClient.setQueryData(["cart"], context.previousCart);
                  }
            },
            onSettled: () => {
                  queryClient.invalidateQueries({ queryKey: ["cart"] });
            },
      });

      const currentQuantity = item.quantity;
      const imageUrl = item.variation?.imageURLs?.[0] ?? "/placeholder-image.png";
      const productName = item.product?.name || "Unknown Product";

      // Helpers for formatting
      const formatNGN = (val: number) =>
            new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(val);

      const subtotal = formatNGN((item.variation?.price ?? 0) * currentQuantity);

      const handleUpdate = (delta: number) => {
            if (delta === 0) return;
            const newQuantity = currentQuantity + delta;

            if (newQuantity >= 1) {
                  // Wrap itemId in String() to convert number -> string
                  mutate({ itemId: String(itemId), quantity: newQuantity });
            }
      };

      const handleRemove = () => {
            // Convert the number to a string to satisfy the type requirement
            removeItemMutation(String(itemId));
      };

      const isDisabled = isPending || isRemoving;

      return (
            <div className="flex gap-4">
                  <div className="h-20 w-20 rounded-md border shrink-0 overflow-hidden">
                        <Image
                              src={imageUrl}
                              alt={productName}
                              className="object-cover w-full h-full"
                              width={80}
                              height={80}
                        />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between">
                              <h3 className="font-medium text-sm">{productName}</h3>
                              <p className="font-bold text-sm">{subtotal}</p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2 border rounded-md p-1">
                                    <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                          disabled={isDisabled || currentQuantity <= 1}
                                          onClick={() => handleUpdate(-1)}
                                    >
                                          <IconMinus className="h-3 w-3" />
                                    </Button>

                                    <span className="text-sm w-4 text-center">
                                          {isPending ? (
                                                <IconLoader className="h-3 w-3 animate-spin mx-auto text-blue-500" />
                                          ) : (
                                                currentQuantity
                                          )}
                                    </span>

                                    <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                          disabled={isDisabled}
                                          onClick={() => handleUpdate(1)}
                                    >
                                          <IconPlus className="h-3 w-3" />
                                    </Button>
                              </div>

                              <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                    disabled={isDisabled}
                                    onClick={handleRemove}
                              >
                                    {isRemoving ? (
                                          <IconLoader className="h-4 w-4 animate-spin" />
                                    ) : (
                                          <IconTrash className="h-4 w-4" />
                                    )}
                              </Button>
                        </div>
                  </div>
            </div>
      );
};

export default CartItemComponent;

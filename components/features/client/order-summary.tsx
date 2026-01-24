"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/features/client/checkout-form-feilds";
import { getDiscountCode } from "@/lib/mutations/discount";
import { OrderSummaryProps } from "@/lib/types";

const OrderSummary = ({ cartItems, total, shippingFee, subtotal }: OrderSummaryProps) => {
      const queryClient = useQueryClient();

      const { mutate } = useMutation({
            mutationFn: getDiscountCode,
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["cart", "discount"] });
            },
      });

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const discountCode = formData.get("discountCode");

            if (typeof discountCode === "string" && discountCode.trim() !== "") {
                  mutate(discountCode);
            }
      };

      return (
            <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4 items-center">
                        {cartItems.map((item) => {
                              // 1. Safety check for Image URL
                              const imageUrl = item.variation?.imageURLs?.[0] ?? "/placeholder.png";

                              // 2. Safety check for Price (defaults to 0 if undefined)
                              const price = item.variation?.price ?? 0;

                              return (
                                    <div key={item._id} className="flex justify-between items-center gap-4 w-full">
                                          <div className="relative w-16 h-16 border border-gray-200 rounded-lg bg-white p-1 flex items-center justify-center">
                                                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center z-10">
                                                      {item.quantity}
                                                </div>

                                                <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                                                      <Image
                                                            src={imageUrl}
                                                            alt={item.product?.name ?? "Product Image"}
                                                            width={64}
                                                            height={64}
                                                            className="object-cover"
                                                      />
                                                </div>
                                          </div>

                                          <div className="flex-1">
                                                <h3 className="text-sm font-medium text-gray-900">
                                                      {item.product?.name ?? "Unnamed Product"}
                                                </h3>
                                                <p className="text-xs text-gray-500">{item.variation?.color}</p>
                                          </div>

                                          <p className="text-sm font-medium text-gray-900">
                                                {new Intl.NumberFormat("en-NG", {
                                                      style: "currency",
                                                      currency: "NGN",
                                                }).format(price)}
                                          </p>
                                    </div>
                              );
                        })}
                  </div>

                  {/* Discount Form and Totals remain largely the same, 
          but ensure 'subtotal' passed from props is a string/formatted */}
                  <form onSubmit={handleSubmit}>
                        <div className="flex gap-3">
                              <div className="flex-1">
                                    <FormField
                                          placeholder="Discount code"
                                          id="discount"
                                          type="text"
                                          name="discountCode"
                                    />
                              </div>
                              <Button
                                    variant="outline"
                                    className="bg-[#5a31f4] hover:bg-[#4c29cc] text-white hover:text-white font-medium px-4 rounded-md text-sm h-auto py-3"
                              >
                                    Apply
                              </Button>
                        </div>
                  </form>

                  <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Subtotal</span>
                              <span className="font-medium text-gray-900">
                                    {new Intl.NumberFormat("en-NG", {
                                          style: "currency",
                                          currency: "NGN",
                                    }).format(total)}
                              </span>
                        </div>
                        <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Shipping</span>
                              <span className="text-gray-500 text-xs mt-1">
                                    {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
                                          shippingFee,
                                    )}
                              </span>
                        </div>
                  </div>

                  <div className="flex justify-between items-baseline pt-4 border-t border-gray-200">
                        <span className="text-base font-medium text-gray-900">Total</span>
                        <div className="flex items-baseline gap-2">
                              <span className="text-xs text-gray-500">NGN</span>
                              <span className="text-xl font-semibold text-gray-900">{subtotal}</span>
                        </div>
                  </div>
            </div>
      );
};

export default OrderSummary;

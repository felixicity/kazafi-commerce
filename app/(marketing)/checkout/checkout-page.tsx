"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUserAddress, fetchUserDetails } from "@/lib/mutations/users";
import { fetchCartItems } from "../../../lib/mutations/cart";
import Link from "next/link";
import { MobileOrderSummaryToggle } from "./mobile-summary";
import { SelectField, FormField } from "@/components/features/client/checkout-form-feilds";
import OrderSummary from "@/components/features/client/order-summary";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup, FieldTitle, FieldLabel, FieldDescription, Field, FieldContent } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddressConfirmationDialog } from "@/components/features/address-confirmation-dialog";
import { createPaymentIntent } from "@/lib/mutations/payment";
import { createOrder } from "@/lib/mutations/order";
import { Spinner } from "@/components/ui/spinner";
import { Address, CartItem } from "@/lib/types";

const shippingOptions = [
      {
            id: 1,
            label: "Delivery",
            amount: { currency: "NGN", value: 1020 },
            estimatedDeliveryTime: "Within 2 - 3 work days",
      },
      {
            id: 2,
            label: "Pickup",
            amount: { currency: "NGN", value: 0 },
            estimatedDeliveryTime: "During open hours 8am - 5pm",
      },
];

const CheckoutPage: React.FC = () => {
      const queryClient = useQueryClient();
      const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
      const [shippingFee, setShippingFee] = useState<number>(0);

      // State for the specific address chosen for this order
      const [orderAddress, setOrderAddress] = useState<string>("");
      // Track if the user manually closed the "Use Default" dialog to show the form instead
      const [isDialogUserClosed, setIsDialogUserClosed] = useState(false);

      // Queries
      const { data: userData } = useQuery({ queryKey: ["user"], queryFn: fetchUserDetails });
      const { data: userCart } = useQuery({ queryKey: ["cart"], queryFn: fetchCartItems });

      // Mutations
      const { mutate: saveAddressMutation, isPending: isSavingAddress } = useMutation({
            mutationFn: addUserAddress,
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
      });

      const { mutateAsync: orderMutation, isPending: isOrdering } = useMutation({ mutationFn: createOrder });
      const { mutateAsync: paymentMutation, isPending: isPaying } = useMutation({ mutationFn: createPaymentIntent });

      // Derived Address Logic
      const defaultAddress = useMemo(() => userData?.addresses?.find((addr: Address) => addr.isDefault), [userData]);

      const savedFullAddress = defaultAddress
            ? `${defaultAddress.street}, ${defaultAddress.city}, ${defaultAddress.country}`
            : "";

      // Logic: Show dialog ONLY if user has a default address AND hasn't opted to change it yet
      const showConfirmationDialog = Boolean(defaultAddress) && !orderAddress && !isDialogUserClosed;

      const handleConfirmSavedAddress = () => {
            setOrderAddress(savedFullAddress);
      };

      const handleDismissDialog = () => {
            setIsDialogUserClosed(true); // This reveals the form
      };

      async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            let finalAddress = orderAddress;

            // If no address was selected from dialog, handle form submission
            if (!finalAddress) {
                  const addressData = {
                        firstname: String(formData.get("firstname")),
                        lastname: String(formData.get("lastname")),
                        phone: String(formData.get("phone")),
                        street: String(formData.get("street")),
                        city: String(formData.get("city")),
                        state: String(formData.get("state")),
                        postcode: String(formData.get("postCode")),
                        country: String(formData.get("country")),
                  };
                  finalAddress = `${addressData.street}, ${addressData.city}, ${addressData.country}`;
                  saveAddressMutation(addressData);
            }

            try {
                  const deliveryMethod = String(formData.get("shippingOption") || "delivery");

                  const res = await orderMutation({
                        address: finalAddress,
                        shippingMethod: deliveryMethod.toLowerCase(),
                  });
                  const payment = await paymentMutation({ orderId: res.order._id, provider: "paystack" });
                  if (payment?.paymentUrl) window.location.href = payment.paymentUrl;
            } catch (err) {
                  console.error("Checkout failed", err);
            }
      }

      const cartItems = userCart?.cart?.items || [];

      const total = cartItems.reduce(
            (acc: number, item: CartItem) => acc + (item.variation?.price || 0) * item.quantity,
            0,
      );

      const subtotal = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
            total + shippingFee,
      );

      return (
            <div>
                  <AddressConfirmationDialog
                        isOpen={showConfirmationDialog}
                        address={savedFullAddress}
                        onConfirm={handleConfirmSavedAddress}
                        onDismiss={handleDismissDialog}
                  />

                  <MobileOrderSummaryToggle
                        isOpen={isOrderSummaryOpen}
                        onToggle={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
                        subtotal={subtotal}
                  >
                        <OrderSummary
                              cartItems={cartItems}
                              total={total}
                              shippingFee={shippingFee}
                              subtotal={subtotal}
                        />
                  </MobileOrderSummaryToggle>

                  <div className="flex justify-between">
                        <form className="flex-1 border-r p-8" onSubmit={handleSubmit}>
                              <div className="max-w-lg mx-auto space-y-8">
                                    {/* Show Form ONLY if no address is locked in */}
                                    {!orderAddress ? (
                                          <FieldGroup>
                                                <FieldTitle className="text-lg font-medium">
                                                      Shipping Information
                                                </FieldTitle>
                                                <div className="space-y-3">
                                                      <SelectField
                                                            id="country"
                                                            name="country"
                                                            label="Country"
                                                            options={["Nigeria", "Ghana"]}
                                                      />
                                                      <div className="grid grid-cols-2 gap-3">
                                                            <FormField
                                                                  id="firstname"
                                                                  name="firstname"
                                                                  placeholder="First Name"
                                                                  required
                                                            />
                                                            <FormField
                                                                  id="lastname"
                                                                  name="lastname"
                                                                  placeholder="Last Name"
                                                                  required
                                                            />
                                                      </div>
                                                      <FormField
                                                            id="street"
                                                            name="street"
                                                            placeholder="Address"
                                                            required
                                                      />
                                                      <div className="grid grid-cols-3 gap-3">
                                                            <FormField
                                                                  id="city"
                                                                  name="city"
                                                                  placeholder="City"
                                                                  required
                                                            />
                                                            <FormField id="state" name="state" placeholder="State" />
                                                            <FormField
                                                                  id="postcode"
                                                                  name="postCode"
                                                                  placeholder="Postcode"
                                                            />
                                                      </div>
                                                      <FormField
                                                            id="phone"
                                                            name="phone"
                                                            placeholder="Phone"
                                                            type="tel"
                                                      />
                                                </div>
                                          </FieldGroup>
                                    ) : (
                                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                                                <p className="text-sm font-medium text-blue-900">Shipping to:</p>
                                                <p className="text-sm text-blue-800">{orderAddress}</p>
                                                <Button
                                                      variant="link"
                                                      className="p-0 h-auto text-xs"
                                                      onClick={() => {
                                                            setOrderAddress("");
                                                            setIsDialogUserClosed(true);
                                                      }}
                                                >
                                                      Edit Address
                                                </Button>
                                          </div>
                                    )}

                                    <FieldGroup className="mt-8">
                                          <FieldTitle className="text-lg font-medium mb-4">Shipping method</FieldTitle>
                                          <FieldDescription className="bg-gray-50 rounded-md p-4 text-sm text-gray-500 flex items-center justify-center text-center">
                                                Pick an option for shipping method
                                          </FieldDescription>
                                          <RadioGroup
                                                defaultValue="delivery"
                                                onValueChange={(value) =>
                                                      setShippingFee(
                                                            shippingOptions.find((option) => option.label === value)
                                                                  ?.amount.value || 0,
                                                      )
                                                }
                                                name="shippingOption"
                                          >
                                                <div className="grid grid-cols-2 gap-8">
                                                      {shippingOptions.map((option) => (
                                                            <FieldLabel htmlFor={option.label} key={option.id}>
                                                                  <Field orientation="horizontal">
                                                                        <FieldContent>
                                                                              <FieldTitle>
                                                                                    <RadioGroupItem
                                                                                          value={option.label}
                                                                                          id={option.label}
                                                                                          aria-label={option.label}
                                                                                    />
                                                                                    {option.label}
                                                                              </FieldTitle>

                                                                              <FieldDescription className="my-3">
                                                                                    {option.estimatedDeliveryTime}
                                                                              </FieldDescription>

                                                                              <h3>
                                                                                    {new Intl.NumberFormat("en-NG", {
                                                                                          style: "currency",
                                                                                          currency: option.amount
                                                                                                .currency,
                                                                                    }).format(
                                                                                          Number(option.amount.value),
                                                                                    )}
                                                                              </h3>
                                                                        </FieldContent>
                                                                  </Field>
                                                            </FieldLabel>
                                                      ))}
                                                </div>
                                          </RadioGroup>
                                    </FieldGroup>

                                    {/* Remember Me */}
                                    {!userData && (
                                          <FieldGroup className="mt-8">
                                                <h2 className="text-lg font-medium mb-4">Remember me</h2>
                                                <div className="border border-gray-200 rounded-md p-4 space-y-4">
                                                      <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                  id="remember"
                                                                  className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white"
                                                            />
                                                            <FieldLabel
                                                                  htmlFor="remember"
                                                                  className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                  Save my information for a faster checkout with a
                                                                  Kazafi account
                                                            </FieldLabel>
                                                      </div>

                                                      <div className="space-y-3 pt-2">
                                                            <FormField
                                                                  id="shop-fname"
                                                                  placeholder="First name"
                                                                  type="text"
                                                            />
                                                            <FormField
                                                                  id="shop-phone"
                                                                  placeholder="Mobile phone number"
                                                                  type="tel"
                                                            />
                                                      </div>
                                                </div>

                                                <div className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-400">
                                                      <Lock size={10} />
                                                      <span>Secure and encrypted</span>
                                                </div>

                                                <div className="flex justify-end mt-1">
                                                      <span className="font-black italic text-gray-400 text-xs tracking-tight">
                                                            kazafi
                                                      </span>
                                                </div>
                                          </FieldGroup>
                                    )}

                                    <div className="text-xs text-gray-500 leading-relaxed">
                                          Your info will be saved to a Kazafi account. By continuing, you agree to
                                          Kazafi’s{" "}
                                          <Link href="#" className="underline">
                                                Terms of Service
                                          </Link>{" "}
                                          and acknowledge the{" "}
                                          <Link href="#" className="underline">
                                                Privacy Policy
                                          </Link>
                                          .
                                    </div>

                                    {/* Shipping Methods and Submit Button remain visible */}
                                    <Button
                                          type="submit"
                                          className="w-full bg-black text-white h-12"
                                          disabled={isOrdering || isPaying}
                                    >
                                          {isOrdering || isPaying ? (
                                                <>
                                                      <Spinner /> In progress...
                                                </>
                                          ) : (
                                                `Pay now ${subtotal}`
                                          )}
                                    </Button>
                              </div>
                        </form>

                        <div className="hidden lg:block w-[45%] bg-[#fafafa] p-12">
                              <OrderSummary
                                    cartItems={cartItems}
                                    total={total}
                                    shippingFee={shippingFee}
                                    subtotal={subtotal}
                              />
                        </div>
                  </div>
            </div>
      );
};

export default CheckoutPage;

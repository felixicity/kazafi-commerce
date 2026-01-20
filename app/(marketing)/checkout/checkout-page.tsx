"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUserAddress } from "@/lib/mutations/users";
import { fetchCartItems } from "../../../lib/mutations/cart"; // Abstracted fetcher
import Link from "next/link";
import { MobileOrderSummaryToggle } from "./mobile-summary";
import { SelectField, FormField } from "@/components/features/client/checkout-form-feilds";
import OrderSummary from "@/components/features/client/order-summary";
import { Lock, HelpCircle } from "lucide-react";

// Shadcn/ui Imports (assuming these are available under the specified paths)
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IconShoppingBag } from "@tabler/icons-react";
import { Field, FieldDescription, FieldLabel, FieldGroup, FieldTitle, FieldContent } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fetchUserDetails } from "@/lib/mutations/users";
import { AddressConfirmationDialog } from "@/components/features/address-confirmation-dialog";
import { createPaymentIntent } from "@/lib/mutations/payment";
import { createOrder } from "@/lib/mutations/order";
import { Spinner } from "@/components/ui/spinner";

interface Address {
      _id?: string;
      street: string;
      city: string;
      country: string;
      firstname?: string;
      lastname?: string;
      phone?: string;
      postcode?: string;
      isDefault?: boolean;
}

interface User {
      _id: string;
      email?: string;
      addresses?: Address[];
}

interface ShippingOption {
      id: string;
      label: string;
      amount: { currency: string; value: string };
      estimatedDeliveryTime: string;
}

interface Order {
      _id: string;
}

interface Payment {
      paymentUrl: string;
}

interface AddressFormData {
      name: string;
      phone: string;
      street: string;
      city: string;
      state: string;
      postCode: string;
      country: string;
}

const initialShippingOptions: ShippingOption[] = [];

// --- MainCheckout Page Component ---

const CheckoutPage: React.FC = () => {
      const [city, setCity] = useState<string>("");
      const [availableOptions, setAvailableOptions] = useState<ShippingOption[]>(initialShippingOptions);
      const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState<boolean>(false);
      const [addressConfirmOpen, setAddressConfirmOpen] = useState<boolean>(false);
      const [defaultAddress, setDefaultAddress] = useState<boolean>(false);

      const isLocationValid = city.trim().length > 2;

      useEffect(() => {
            if (!isLocationValid) {
                  return;
            }

            const fetchShippingOptions = async () => {
                  try {
                        // const res = await fetch("/api/shipping-options", {
                        //       method: "POST",
                        //       headers: {
                        //             "Content-Type": "application.json",
                        //       },
                        //       body: JSON.stringify({ location: city }),
                        // });

                        // if (!res.ok) {
                        //       throw new Error("Failed to fetch shipping options");
                        // }

                        // const data: PaymentShippingOption[] = await res.json();

                        const data = [
                              {
                                    amount: { currency: "NGN", value: "750" },
                                    id: "rkorro4985jg5mg5",
                                    label: "delivery",
                                    estimatedDeliveryTime: "2 - 3 work days",
                              },
                              {
                                    amount: { currency: "NGN", value: "0" },
                                    id: "o4948jrwwo4045",
                                    label: "pickup",
                                    estimatedDeliveryTime: "Pickup from our store location",
                              },
                        ];

                        if (data.length > 0) {
                              setAvailableOptions(data);
                        }
                  } catch (error) {
                        // setError(error instanceof Error ? error.message : "An Unknown error has occured!!");
                        setAvailableOptions(initialShippingOptions);
                        console.error(error);
                  } finally {
                        // setIsLoading(false);
                  }
            };

            fetchShippingOptions();
      }, [city, isLocationValid]);

      // Fetch information of Logged in user
      const { data: userData, error: userDetailsFetchError } = useQuery({
            queryKey: ["user"],
            queryFn: fetchUserDetails,
      });

      // Fetch Cart Items for a logged in user
      const { data: userCart, error: cartItemsFetchError } = useQuery({
            queryKey: ["cart"],
            queryFn: fetchCartItems,
      });

      const queryClient = useQueryClient();

      const {
            mutate: saveAddressMutation,
            isPending,
            error: saveAddressError,
      } = useMutation({
            mutationFn: addUserAddress,
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["user"] });
            },
      });

      const {
            mutateAsync: orderMutation,
            isPending: orderPlacementIsPending,
            error: orderError,
      } = useMutation({
            mutationFn: createOrder,
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["orders"] });
            },
      });

      const {
            mutateAsync: PaymentMutation,
            isPending: paymentProcessisPending,
            error: paymentError,
      } = useMutation({
            mutationFn: createPaymentIntent,
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["payments"] });
            },
      });

      //get users already saved default address
      const address = (userData as User | undefined)?.addresses?.find((addr: Address) => addr.isDefault);

      const houseNumber = address?.street;
      const addressCity = address?.city;
      const addressCountry = address?.country;
      const fullAddress = `${houseNumber}, ${addressCity}, ${addressCountry}`;

      useEffect(() => {
            if (address) {
                  setAddressConfirmOpen(true);
                  setCity(address.city);
            }
      }, [address]);

      // Error Handling
      if (userDetailsFetchError) {
            return "Unable to fetch user details. Please refresh the page or check your connection";
      }

      if (cartItemsFetchError) {
            return "Something went wrong. It's probably from us. Please refresh the page or check your connection";
      }

      const cartItems = userCart?.cart?.items || [];

      // Derived state
      const subtotal = new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
      }).format(cartItems.reduce((acc, item) => acc + (item.variation?.price || 0) * item.quantity, 0));

      async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            const formElement = e.currentTarget;
            // If there's no address, collect form data and save it
            let newAddress: string | null = null;
            if (!address) {
                  const formData = new FormData(formElement);
                  const addressData: AddressFormData = {
                        name: String(formData.get("name") || ""),
                        phone: String(formData.get("phone") || ""),
                        street: String(formData.get("street") || ""),
                        city: String(formData.get("city") || ""),
                        state: String(formData.get("state") || ""),
                        postCode: String(formData.get("postCode") || ""),
                        country: String(formData.get("country") || ""),
                  };

                  newAddress = `${addressData.street}, ${addressData.city}, ${addressData.country}`;
                  saveAddressMutation(addressData);
            }

            const res = (await orderMutation(newAddress || fullAddress)) as { order: Order };

            const payment = (await PaymentMutation({ orderId: res.order._id, provider: "paystack" })) as Payment;

            if (payment) {
                  window.location.href = payment.paymentUrl;
            }
      }

      const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
            if ("target" in e && e.target instanceof HTMLInputElement) {
                  setCity(e.target.value);
            }
      };

      return (
            <div>
                  {/* Mobile Header (Logo + Cart Icon) */}
                  <div className="lg:hidden p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                        <h1 className="text-2xl font-black italic tracking-tighter">Kazafi</h1>
                        <IconShoppingBag className="text-black" />
                  </div>

                  {/* Mobile Order Summary Accordion */}
                  <MobileOrderSummaryToggle
                        isOpen={isOrderSummaryOpen}
                        onToggle={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
                  >
                        <OrderSummary cartItems={cartItems} subtotal={subtotal} />
                  </MobileOrderSummaryToggle>
                  <div className="flex justify-between">
                        <form
                              className="min-h-screen bg-white font-sans text-gray-900 lg:flex-row flex-1 flex flex-col items-center lg:ml-16 pt-8 pb-12 px-4 sm:px-6 lg:px-8 lg:pt-12 order-2 lg:order-1 border-r border-gray-200"
                              onSubmit={(e) => handleSubmit(e)}
                        >
                              {/* Address Confirmation Dialog */}

                              {address && (
                                    <AddressConfirmationDialog
                                          addressConfirmOpen={addressConfirmOpen}
                                          setAddressConfirmOpen={setAddressConfirmOpen}
                                          setDefaultAddress={setDefaultAddress}
                                          fullAddress={fullAddress}
                                    />
                              )}

                              {/* Left Column: Form Section */}
                              <div>
                                    <div className="w-full max-w-lg space-y-8">
                                          {/* Desktop Header */}
                                          <div className="hidden lg:block mb-8">
                                                <h1 className="text-3xl font-black tracking-tighter">Kazafi</h1>
                                          </div>

                                          {/* Contact Section */}
                                          {!userData && (
                                                <FieldGroup className="gap-1">
                                                      <div className="flex justify-between items-center mb-8">
                                                            <FieldTitle className="text-lg font-medium">
                                                                  Contact
                                                            </FieldTitle>
                                                            <Link
                                                                  href="#"
                                                                  className="text-sm text-blue-600 hover:underline"
                                                            >
                                                                  Log in
                                                            </Link>
                                                      </div>
                                                      <div className="space-y-3">
                                                            <FormField
                                                                  id="email"
                                                                  name="email"
                                                                  placeholder="Email or mobile phone number"
                                                                  type="email"
                                                            />
                                                      </div>
                                                      <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                  id="newsletter"
                                                                  className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white"
                                                            />
                                                            <FieldLabel
                                                                  htmlFor="newsletter"
                                                                  className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                  Email me with news and offers
                                                            </FieldLabel>
                                                      </div>
                                                      {/* <FieldError>No email</FieldError> */}
                                                </FieldGroup>
                                          )}

                                          {defaultAddress && (
                                                <div>
                                                      <h4 className="">{fullAddress} </h4>
                                                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
                                                            This address will be used for this order.
                                                      </div>
                                                </div>
                                          )}

                                          {/* Delivery Section */}

                                          {!defaultAddress && (
                                                <FieldGroup className="gap-1">
                                                      <FieldTitle className="text-lg font-medium mb-4 mt-4">
                                                            Address Information
                                                      </FieldTitle>
                                                      <div className="space-y-3">
                                                            <SelectField
                                                                  id="country"
                                                                  label="Country/Region"
                                                                  options={["Nigeria", "Ghana", "Benin Republic"]}
                                                                  name="country"
                                                            />

                                                            <FormField
                                                                  id="name"
                                                                  name="name"
                                                                  placeholder="Full name"
                                                                  required
                                                            />

                                                            <FormField
                                                                  id="street"
                                                                  name="street"
                                                                  placeholder="Address"
                                                                  type="text"
                                                                  required
                                                            />

                                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                                  <FormField
                                                                        id="city"
                                                                        placeholder="City"
                                                                        type="text"
                                                                        name="city"
                                                                        className="sm:col-span-1"
                                                                        onMouseLeave={(e) => handleLocationChange(e)}
                                                                        required
                                                                  />
                                                                  <FormField
                                                                        id="state"
                                                                        name="state"
                                                                        placeholder="State"
                                                                        type="text"
                                                                        className="sm:col-span-1"
                                                                  />
                                                                  <FormField
                                                                        id="postCode"
                                                                        name="postCode"
                                                                        placeholder="Postcode"
                                                                        type="text"
                                                                        className="sm:col-span-1"
                                                                  />
                                                            </div>

                                                            <FormField
                                                                  id="phone"
                                                                  placeholder="Phone"
                                                                  type="tel"
                                                                  name="phone"
                                                                  icon={<HelpCircle size={16} />}
                                                            />
                                                      </div>
                                                      {/* <FieldError></FieldError> */}
                                                </FieldGroup>
                                          )}
                                          {/* Shipping Method Placeholder */}

                                          <FieldGroup className="mt-8">
                                                <FieldTitle className="text-lg font-medium mb-4">
                                                      Shipping method
                                                </FieldTitle>
                                                <FieldDescription className="bg-gray-50 rounded-md p-4 text-sm text-gray-500 flex items-center justify-center text-center">
                                                      {availableOptions.length > 0
                                                            ? "Pick an option for shipping method"
                                                            : "Enter your shipping address to view available shipping methods."}
                                                </FieldDescription>
                                                <RadioGroup
                                                      defaultValue="delivery"
                                                      // onValueChange={(value) => console.log(value)}
                                                      name="shippingOption"
                                                >
                                                      <div className="grid grid-cols-2 gap-8">
                                                            {availableOptions.length > 0 &&
                                                                  availableOptions.map((option) => (
                                                                        <FieldLabel
                                                                              htmlFor={option.label}
                                                                              key={option.id}
                                                                        >
                                                                              <Field orientation="horizontal">
                                                                                    <FieldContent>
                                                                                          <FieldTitle>
                                                                                                <RadioGroupItem
                                                                                                      value={
                                                                                                            option.label
                                                                                                      }
                                                                                                      id={option.label}
                                                                                                      aria-label={
                                                                                                            option.label
                                                                                                      }
                                                                                                />
                                                                                                {option.label}
                                                                                          </FieldTitle>

                                                                                          <FieldDescription className="my-3">
                                                                                                {
                                                                                                      option.estimatedDeliveryTime
                                                                                                }
                                                                                          </FieldDescription>

                                                                                          <h3>
                                                                                                {new Intl.NumberFormat(
                                                                                                      "en-NG",
                                                                                                      {
                                                                                                            style: "currency",
                                                                                                            currency: option
                                                                                                                  .amount
                                                                                                                  .currency,
                                                                                                      }
                                                                                                ).format(
                                                                                                      Number(
                                                                                                            option
                                                                                                                  .amount
                                                                                                                  .value
                                                                                                      )
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

                                          {/* Footer Actions */}
                                          <div className="mt-8 space-y-6">
                                                <Button
                                                      type="submit"
                                                      className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 rounded-md shadow-lg transition-transform active:scale-[0.99] h-auto"
                                                >
                                                      Pay now {subtotal}{" "}
                                                      {paymentProcessisPending ||
                                                      orderPlacementIsPending ||
                                                      isPending ? (
                                                            <Spinner />
                                                      ) : (
                                                            ""
                                                      )}
                                                </Button>

                                                <div className="text-xs text-gray-500 leading-relaxed">
                                                      Your info will be saved to a Kazafi account. By continuing, you
                                                      agree to Kazafi’s{" "}
                                                      <Link href="#" className="underline">
                                                            Terms of Service
                                                      </Link>{" "}
                                                      and acknowledge the{" "}
                                                      <Link href="#" className="underline">
                                                            Privacy Policy
                                                      </Link>
                                                      .
                                                </div>

                                                <div className="pt-6 border-t border-gray-200">
                                                      <Link href="#" className="text-xs text-blue-600 hover:underline">
                                                            Privacy policy
                                                      </Link>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </form>

                        {/* Right Column: Desktop Summary Section */}
                        <div className="hidden lg:block w-full lg:w-[45%] bg-[#fafafa] border-l border-gray-200 pt-12 px-8 order-1 lg:order-2">
                              <div className="max-w-md mx-auto sticky top-12">
                                    <OrderSummary cartItems={cartItems} subtotal={subtotal} />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default CheckoutPage;

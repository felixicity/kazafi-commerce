"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MobileOrderSummaryToggle, SelectField, FormField, OrderSummary } from "./mobile-summary";
import { Lock, HelpCircle } from "lucide-react";

// Shadcn/ui Imports (assuming these are available under the specified paths)
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IconShoppingBag } from "@tabler/icons-react";
import { FieldDescription, FieldLabel, FieldGroup, FieldTitle } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const initialShippingOptions: PaymentShippingOption[] = [];

function handleSubmit(e: HTMLFormElement) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      for (const [key, value] of formData.entries()) {
            console.log(`${key} : ${value}`);
      }
      console.log("Felix's form submitted!!");
}

// --- Main Checkout Page Component ---

const CheckoutForm: React.FC = () => {
      const [city, setCity] = useState<string>("");
      const [availableOptions, setAvailableOptions] = useState<PaymentShippingOption[]>(initialShippingOptions);
      const [selectedOptionId, setSelectedOptionId] = useState<string>("");
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);
      const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState<boolean>(false);

      const isLocationValid = city.trim().length > 2;

      useEffect(() => {
            if (!isLocationValid) {
                  return;
            }

            const fetchShippingOptions = async () => {
                  setIsLoading(true);
                  setError(null);

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

                        const data: PaymentShippingOption[] = [
                              {
                                    amount: { currency: "NGN", value: "750" },
                                    id: "rkorro4985jg5mg5",
                                    label: "delivery",
                                    estimatedDelievery: "24 hours",
                              },
                              {
                                    amount: { currency: "NGN", value: "0" },
                                    id: "o4948jrwwo4045",
                                    label: "pickup",
                                    estimatedDelievery: "Pickup from our store location",
                              },
                        ];

                        if (data.length > 0) {
                              setAvailableOptions(data);
                        }
                  } catch (error) {
                        setError(error instanceof Error ? error.message : "An Unknown error has occured!!");
                        setAvailableOptions(initialShippingOptions);
                  } finally {
                        setIsLoading(false);
                  }
            };

            fetchShippingOptions();
      }, [city, isLocationValid]);

      const handleLocationChange = (e) => {
            setCity(e.target.value);
      };

      return (
            <form
                  className="min-h-screen bg-white font-sans text-gray-900 flex flex-col lg:flex-row"
                  onSubmit={(e) => handleSubmit(e)}
            >
                  {/* Mobile Header (Logo only) */}
                  <div className="lg:hidden p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                        <h1 className="text-2xl font-black italic tracking-tighter">Kazafi</h1>
                        <IconShoppingBag className="text-black" />
                  </div>

                  {/* Mobile Order Summary Accordion */}
                  <MobileOrderSummaryToggle
                        isOpen={isOrderSummaryOpen}
                        onToggle={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
                  >
                        <OrderSummary />
                  </MobileOrderSummaryToggle>

                  {/* Left Column: Form Section */}
                  <div className="flex-1 flex flex-col items-center pt-8 pb-12 px-4 sm:px-6 lg:px-8 lg:pt-12 order-2 lg:order-1 border-r border-gray-200">
                        <div className="w-full max-w-lg space-y-8">
                              {/* Desktop Header */}
                              <div className="hidden lg:block mb-8">
                                    <h1 className="text-3xl font-black tracking-tighter">Kazafi</h1>
                              </div>

                              {/* Contact Section */}
                              <FieldGroup className="gap-5 my-0">
                                    <div className="flex justify-between items-center mb-4">
                                          <FieldTitle className="text-lg font-medium">Contact</FieldTitle>
                                          <Link href="#" className="text-sm text-blue-600 hover:underline">
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

                              {/* Delivery Section */}
                              <FieldGroup className="gap-1">
                                    <FieldTitle className="text-lg font-medium mb-4 mt-8">Delivery</FieldTitle>
                                    <div className="space-y-3">
                                          <SelectField
                                                id="country"
                                                label="Country/Region"
                                                options={["Nigeria", "Ghana", "Benin Republic"]}
                                                name="country"
                                          />

                                          <div className="grid grid-cols-2 gap-3">
                                                <FormField
                                                      id="firstName"
                                                      name="firstname"
                                                      placeholder="First name (optional)"
                                                />
                                                <FormField
                                                      id="lastName"
                                                      placeholder="Last name"
                                                      name="lastname"
                                                      required
                                                />
                                          </div>

                                          <FormField
                                                id="address"
                                                name="address"
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
                                                      id="zip"
                                                      name="zip"
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

                              {/* Shipping Method Placeholder */}
                              <FieldGroup className="mt-8">
                                    <FieldTitle className="text-lg font-medium mb-4">Shipping method</FieldTitle>
                                    <FieldDescription className="bg-gray-50 rounded-md p-4 text-sm text-gray-500 flex items-center justify-center text-center">
                                          {availableOptions.length > 0
                                                ? "Pick an option for shipping method"
                                                : "Enter your shipping address to view available shipping methods."}
                                    </FieldDescription>
                                    <div className="grid grid-cols-2 gap-8">
                                          {availableOptions.length > 0 &&
                                                availableOptions.map((option) => (
                                                      <Card
                                                            key={option.id}
                                                            className="p-2 py-3 hover:border-2 border-gray-500 box-content"
                                                      >
                                                            <CardHeader>
                                                                  <CardTitle>{option.label}</CardTitle>
                                                                  <CardDescription>
                                                                        {option.estimatedDelievery}
                                                                  </CardDescription>
                                                            </CardHeader>
                                                            <CardContent>
                                                                  <div>
                                                                        <h3>
                                                                              {new Intl.NumberFormat("en-NG", {
                                                                                    style: "currency",
                                                                                    currency: option.amount.currency,
                                                                              }).format(Number(option.amount.value))}
                                                                        </h3>
                                                                  </div>
                                                            </CardContent>
                                                      </Card>
                                                ))}
                                    </div>
                              </FieldGroup>

                              {/* Remember Me */}
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
                                                      Save my information for a faster checkout with a Kazafi account
                                                </FieldLabel>
                                          </div>

                                          <div className="space-y-3 pt-2">
                                                <FormField id="shop-fname" placeholder="First name" type="text" />
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

                              {/* Footer Actions */}
                              <div className="mt-8 space-y-6">
                                    <Button
                                          type="submit"
                                          className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 rounded-md shadow-lg transition-transform active:scale-[0.99] h-auto"
                                    >
                                          Pay now
                                    </Button>

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

                                    <div className="pt-6 border-t border-gray-200">
                                          <Link href="#" className="text-xs text-blue-600 hover:underline">
                                                Privacy policy
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Right Column: Desktop Summary Section */}
                  <div className="hidden lg:block w-full lg:w-[45%] bg-[#fafafa] border-l border-gray-200 pt-12 px-8 order-1 lg:order-2">
                        <div className="max-w-md mx-auto sticky top-12">
                              <OrderSummary />
                        </div>
                  </div>
            </form>
      );
};

export default CheckoutForm;

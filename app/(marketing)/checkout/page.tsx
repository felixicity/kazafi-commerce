"use client";

import React, { useState } from "react";
import { ChevronDown, ShoppingBag, Lock, HelpCircle, CreditCard } from "lucide-react";

// Shadcn/ui Imports (assuming these are available under the specified paths)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// --- Types ---

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
      label?: string;
      id: string;
      icon?: React.ReactNode;
      className?: string;
}

interface SelectFieldProps {
      id: string;
      label: string;
      options: string[];
      className?: string;
      defaultValue?: string;
}

interface MobileAccordionProps {
      children: React.ReactNode;
      isOpen: boolean;
      onToggle: () => void;
}

// --- Icons & SVGs ---
// Payment Icons (Kept as custom SVGs)
const VisaIcon: React.FC = () => (
      <svg viewBox="0 0 36 24" className="h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="24" rx="2" fill="white" stroke="#E5E7EB" />
            <path
                  d="M13.4 15.6l2-11.6h3.2l-2 11.6h-3.2zm10.8-11.3c-.9 0-1.6.4-2 .9l-5.6 10.4h3.4l.7-1.9h4.1l.4 1.9h3l-2.6-11.3h-1.4zm-12.8 0L9.1 10 8.6 8.2l-.3-1.1C8 6.3 7 5.6 5.8 5.6H2v.8c2 .4 3.7 1.4 4.3 2.6l3.8 6.5h3.4l5.1-11.2h-3.2zm8.6 8.1l.8-4.2.5 2.1-.2.8.2.1-.4 1.2z"
                  fill="#1A1F71"
            />
      </svg>
);

const MastercardIcon: React.FC = () => (
      <svg viewBox="0 0 36 24" className="h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="24" rx="2" fill="white" stroke="#E5E7EB" />
            <circle cx="13" cy="12" r="7" fill="#EB001B" />
            <circle cx="23" cy="12" r="7" fill="#F79E1B" fillOpacity="0.85" />
      </svg>
);

const AmexIcon: React.FC = () => (
      <svg viewBox="0 0 36 24" className="h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="24" rx="2" fill="#006FCF" />
            <path
                  d="M4 16h2l1-2h3l1 2h2l-3-8h-3l-3 8zm3.2-3l.8-2 .8 2h-1.6zm8.8 3h4l2-2v2h2V8h-3v5l-2-5h-3v8zm2-2v-4l1.5 4h.5zm9 2h2.5l1.5-3 1.5 3h2.5l-3-5 3-4H29l-2 3-2-3h-2.5l3 4-3 5z"
                  fill="white"
            />
      </svg>
);

// --- Shadcn Wrapper Components ---

// Wrapper for shadcn Input to support optional icon and better styling
const FormField: React.FC<FormFieldProps> = ({ label, id, icon, className = "", ...props }) => (
      <div className={`relative ${className}`}>
            {label && (
                  <Label htmlFor={id} className="block text-xs font-medium text-gray-700 mb-1">
                        {label}
                  </Label>
            )}
            <div className="relative">
                  <Input
                        id={id}
                        className={`h-auto block w-full rounded-md border-gray-300 border shadow-sm focus-visible:ring-blue-500 py-3 px-3 text-sm placeholder-gray-500 transition-colors ${
                              icon ? "pr-10" : ""
                        }`}
                        {...props}
                  />
                  {icon && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                              {icon}
                        </div>
                  )}
            </div>
      </div>
);

// Wrapper for shadcn Select to handle label and options, mimicking the original floating label style
const SelectField: React.FC<SelectFieldProps> = ({ id, options, className = "", label, defaultValue }) => {
      const defaultVal = defaultValue || options[0];

      return (
            <div className={`relative ${className}`}>
                  <Label htmlFor={id} className="absolute top-1 left-3 text-[10px] text-gray-500 z-10">
                        {label}
                  </Label>
                  <Select defaultValue={defaultVal}>
                        <SelectTrigger
                              id={id}
                              className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-9 pt-5 px-3 text-sm focus-visible:ring-blue-500 shadow-sm h-auto"
                        >
                              <SelectValue placeholder={defaultVal} />
                        </SelectTrigger>
                        <SelectContent>
                              {options.map((opt) => (
                                    <SelectItem key={opt} value={opt}>
                                          {opt}
                                    </SelectItem>
                              ))}
                        </SelectContent>
                  </Select>
            </div>
      );
};

// Custom mobile accordion component (Kept for specific mobile layout functionality)
const MobileOrderSummaryToggle: React.FC<MobileAccordionProps> = ({ children, isOpen, onToggle }) => (
      <div className="border-t border-b border-gray-200 lg:hidden bg-gray-50">
            <Button
                  variant="ghost"
                  onClick={onToggle}
                  className="flex w-full items-center justify-between py-4 px-4 text-sm bg-gray-50 hover:bg-gray-100 h-auto"
            >
                  <span className="flex items-center gap-2 text-black hover:text-black">
                        <ShoppingBag size={18} className="text-gray-500" />
                        <span className="font-medium">Show order summary</span>
                        <ChevronDown
                              size={16}
                              className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                  </span>
                  <span className="font-medium text-black">$45.00</span>
            </Button>
            <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                        isOpen ? "max-h-96" : "max-h-0"
                  }`}
            >
                  <div className="p-4 pt-0 border-t border-gray-200">{children}</div>
            </div>
      </div>
);

// --- Order Summary Component ---

const OrderSummary: React.FC = () => (
      <div className="flex flex-col gap-6">
            {/* Product List */}
            <div className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 border border-gray-200 rounded-lg bg-white p-1 flex items-center justify-center">
                        <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center z-10">
                              1
                        </div>
                        {/* Placeholder image */}
                        <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-gray-400">
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                              >
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                              </svg>
                        </div>
                  </div>
                  <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">LNRC Tee</h3>
                        <p className="text-xs text-gray-500">S</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">$45.00</p>
            </div>

            {/* Discount Code */}
            <div className="flex gap-3">
                  <div className="flex-1">
                        <FormField placeholder="Discount code" id="discount" type="text" />
                  </div>
                  <Button
                        variant="outline"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700 font-medium px-4 rounded-md text-sm h-auto py-3"
                  >
                        Apply
                  </Button>
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-gray-900">$45.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-500 text-xs mt-1">Enter shipping address</span>
                  </div>
            </div>

            <div className="flex justify-between items-baseline pt-4 border-t border-gray-200">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <div className="flex items-baseline gap-2">
                        <span className="text-xs text-gray-500">USD</span>
                        <span className="text-xl font-semibold text-gray-900">$45.00</span>
                  </div>
            </div>
      </div>
);

// --- Main Checkout Page Component ---

const CheckoutPage: React.FC = () => {
      const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState<boolean>(false);

      return (
            <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col lg:flex-row">
                  {/* Mobile Header (Logo only) */}
                  <div className="lg:hidden p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                        <h1 className="text-2xl font-black italic tracking-tighter">Mobbin</h1>
                        <ShoppingBag className="text-black" />
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
                                    <h1 className="text-3xl font-black italic tracking-tighter">Kazafi</h1>
                              </div>

                              {/* Contact Section */}
                              <section>
                                    <div className="flex justify-between items-center mb-4">
                                          <h2 className="text-lg font-medium">Contact</h2>
                                          <a href="#" className="text-sm text-blue-600 hover:underline">
                                                Log in
                                          </a>
                                    </div>
                                    <div className="space-y-3">
                                          <FormField
                                                id="email"
                                                placeholder="Email or mobile phone number"
                                                type="email"
                                          />
                                          <div className="flex items-center gap-2">
                                                <Checkbox
                                                      id="newsletter"
                                                      className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white"
                                                />
                                                <label
                                                      htmlFor="newsletter"
                                                      className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                      Email me with news and offers
                                                </label>
                                          </div>
                                    </div>
                              </section>

                              {/* Delivery Section */}
                              <section>
                                    <h2 className="text-lg font-medium mb-4 mt-8">Delivery</h2>
                                    <div className="space-y-3">
                                          <SelectField
                                                id="country"
                                                label="Country/Region"
                                                options={[
                                                      "United Arab Emirates",
                                                      "United States",
                                                      "United Kingdom",
                                                      "Nigeria",
                                                ]}
                                          />

                                          <div className="grid grid-cols-2 gap-3">
                                                <FormField
                                                      id="firstName"
                                                      placeholder="First name (optional)"
                                                      type="text"
                                                />
                                                <FormField id="lastName" placeholder="Last name" type="text" required />
                                          </div>

                                          <FormField id="address" placeholder="Address" type="text" required />

                                          <FormField
                                                id="apartment"
                                                placeholder="Apartment, suite, etc. (optional)"
                                                type="text"
                                          />

                                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <FormField
                                                      id="city"
                                                      placeholder="City"
                                                      type="text"
                                                      className="sm:col-span-1"
                                                      required
                                                />
                                                <SelectField
                                                      id="emirate"
                                                      label="Emirate"
                                                      options={["Abu Dhabi", "Dubai", "Sharjah"]}
                                                      className="sm:col-span-1"
                                                />
                                                <FormField
                                                      id="zip"
                                                      placeholder="Postcode"
                                                      type="text"
                                                      className="sm:col-span-1"
                                                />
                                          </div>

                                          <FormField
                                                id="phone"
                                                placeholder="Phone"
                                                type="tel"
                                                icon={<HelpCircle size={16} />}
                                          />
                                    </div>
                              </section>

                              {/* Shipping Method Placeholder */}
                              <section className="mt-8">
                                    <h2 className="text-lg font-medium mb-4">Shipping method</h2>
                                    <div className="bg-gray-50 rounded-md p-4 text-sm text-gray-500 flex items-center justify-center text-center">
                                          Enter your shipping address to view available shipping methods.
                                    </div>
                              </section>

                              {/* Remember Me */}
                              <section className="mt-8">
                                    <h2 className="text-lg font-medium mb-4">Remember me</h2>
                                    <div className="border border-gray-200 rounded-md p-4 space-y-4">
                                          <div className="flex items-center gap-2">
                                                <Checkbox
                                                      id="remember"
                                                      className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white"
                                                />
                                                <label
                                                      htmlFor="remember"
                                                      className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                      Save my information for a faster checkout with a Shop account
                                                </label>
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
                              </section>

                              {/* Footer Actions */}
                              <div className="mt-8 space-y-6">
                                    <Button className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 rounded-md shadow-lg transition-transform active:scale-[0.99] h-auto">
                                          Pay now
                                    </Button>

                                    <div className="text-xs text-gray-500 leading-relaxed">
                                          Your info will be saved to a Shop account. By continuing, you agree to Shop’s{" "}
                                          <a href="#" className="underline">
                                                Terms of Service
                                          </a>{" "}
                                          and acknowledge the{" "}
                                          <a href="#" className="underline">
                                                Privacy Policy
                                          </a>
                                          .
                                    </div>

                                    <div className="pt-6 border-t border-gray-200">
                                          <a href="#" className="text-xs text-blue-600 hover:underline">
                                                Privacy policy
                                          </a>
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
            </div>
      );
};

export default CheckoutPage;

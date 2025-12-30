"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconShoppingBag } from "@tabler/icons-react";
import { ChevronDown } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      name?: string;
}

interface MobileAccordionProps {
      children: React.ReactNode;
      isOpen: boolean;
      onToggle: () => void;
}

// Custom mobile accordion component (Kept for specific mobile layout functionality)
export const MobileOrderSummaryToggle: React.FC<MobileAccordionProps> = ({ children, isOpen, onToggle }) => (
      <div className="border-t border-b border-gray-200 lg:hidden bg-gray-50">
            <Button
                  variant="ghost"
                  onClick={onToggle}
                  className="flex w-full items-center justify-between py-4 px-4 text-sm bg-gray-50 hover:bg-gray-100 h-auto"
            >
                  <span className="flex items-center gap-2 text-black hover:text-black">
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
                  <div className="p-4 pt-2 border-t border-gray-200">{children}</div>
            </div>
      </div>
);

export const FormField: React.FC<FormFieldProps> = ({ label, id, icon, className = "", ...props }) => (
      <Field className={`relative ${className}`}>
            {label && (
                  <FieldLabel htmlFor={id} className="block text-xs font-medium text-gray-700 mb-1">
                        {label}
                  </FieldLabel>
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
      </Field>
);

// Wrapper for shadcn Select to handle label and options, mimicking the original floating label style
export const SelectField: React.FC<SelectFieldProps> = ({ id, options, className = "", label, defaultValue, name }) => {
      const defaultVal = defaultValue || options[0];

      return (
            <Field className={`relative ${className}`}>
                  <FieldLabel htmlFor={id} className="absolute top-1 left-3 text-[10px] text-gray-500 z-10">
                        {label}
                  </FieldLabel>
                  <Select defaultValue={defaultVal} name={name}>
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
            </Field>
      );
};

// --- Order Summary Component ---

export const OrderSummary = ({ cartItems, subtotal }: { cartItems: any[]; subtotal: string }) => {
      return (
            <div className="flex flex-col gap-6">
                  {/* Product List */}
                  <div className="flex flex-col gap-4 items-center">
                        {cartItems.map((item) => (
                              <div key={item._id} className="flex justify-between items-center gap-4 w-full">
                                    <div className="relative w-16 h-16 border border-gray-200 rounded-lg bg-white p-1 flex items-center justify-center">
                                          <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center z-10">
                                                {item.quantity}
                                          </div>

                                          <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-gray-400">
                                                <Image
                                                      src={item?.variation?.imageURLs[0]}
                                                      alt={item?.product.name}
                                                      width={64}
                                                      height={64}
                                                />
                                          </div>
                                    </div>

                                    <div className="flex-1">
                                          <h3 className="text-sm font-medium text-gray-900">{item.product?.name}</h3>
                                          <p className="text-xs text-gray-500">{item.variation?.color}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">
                                          {new Intl.NumberFormat("en-NG", {
                                                style: "currency",
                                                currency: "NGN",
                                          }).format(item.variation?.price)}
                                    </p>
                              </div>
                        ))}
                  </div>
                  {/* Discount Code */}
                  <div className="flex gap-3">
                        <div className="flex-1">
                              <FormField placeholder="Discount code" id="discount" type="text" name="discountCode" />
                        </div>
                        <Button
                              variant="outline"
                              className="bg-[#5a31f4] hover:bg-[#4c29cc] text-white hover:text-white font-medium px-4 rounded-md text-sm h-auto py-3"
                        >
                              Apply
                        </Button>
                  </div>

                  {/* Totals */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Subtotal</span>
                              <span className="font-medium text-gray-900">{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Shipping</span>
                              <span className="text-gray-500 text-xs mt-1">Enter shipping address</span>
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

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MOCK_USER } from "@/lib/store/cart-store";
import { Card } from "@/components/ui/card";
import { IconCreditCard } from "@tabler/icons-react";
import { SettingSubSection } from "@/lib/types";

const ProfileSettings: React.FC = () => (
      <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Profile Information</h3>
            <p className="text-gray-600">Update your name, email, and shipping address.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={MOCK_USER.name} />
                  </div>
                  <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" defaultValue={MOCK_USER.email} disabled className="bg-gray-50" />
                  </div>
            </div>
            <div className="space-y-2">
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input id="address" defaultValue={MOCK_USER.address} />
            </div>
            <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={MOCK_USER.phone} />
            </div>
            <Button variant="default" className="w-full sm:w-auto">
                  Save Changes
            </Button>
      </div>
);

const BillingSettings: React.FC = () => (
      <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Payment & Billing</h3>
            <p className="text-gray-600">Manage your payment methods and view billing statements.</p>

            <Card>
                  <h4 className="text-lg font-semibold mb-3 flex items-center">
                        <IconCreditCard size={20} className="mr-2 text-blue-600" /> Default Payment Method
                  </h4>
                  <p className="text-gray-700">Visa ending in **** 4242</p>
                  <p className="text-sm text-gray-500">Expires 10/2026</p>
                  <div className="mt-4 flex gap-3">
                        <Button variant="outline">Update Card</Button>
                        <Button variant="link">Billing History</Button>
                  </div>
            </Card>
      </div>
);

const SettingsView: React.FC = () => {
      const [subSection, setSubSection] = useState<SettingSubSection>("profile");

      return (
            <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Account Settings</h2>

                  <div className="flex space-x-4 border-b border-gray-200">
                        <button
                              onClick={() => setSubSection("profile")}
                              className={`pb-2 font-semibold transition-colors ${
                                    subSection === "profile"
                                          ? "border-b-2 border-black text-black"
                                          : "text-gray-500 hover:text-gray-800"
                              }`}
                        >
                              Profile
                        </button>
                        <button
                              onClick={() => setSubSection("billing")}
                              className={`pb-2 font-semibold transition-colors ${
                                    subSection === "billing"
                                          ? "border-b-2 border-black text-black"
                                          : "text-gray-500 hover:text-gray-800"
                              }`}
                        >
                              Billing
                        </button>
                  </div>

                  <Card className="p-8!">{subSection === "profile" ? <ProfileSettings /> : <BillingSettings />}</Card>
            </div>
      );
};

export default SettingsView;

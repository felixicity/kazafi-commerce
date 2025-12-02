"use client";

import React, { useState, useMemo } from "react";
import {
      LayoutDashboard,
      History,
      Settings,
      Ticket,
      User,
      CreditCard,
      LogOut,
      ChevronRight,
      Menu,
      X,
      Truck, // <-- FIX: Added missing Truck import
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MOCK_COUPONS, MOCK_ORDERS, MOCK_USER } from "@/lib/store/cart-store";
import { Badge } from "@/components/ui/badge";

// =================================================================
// MAIN APPLICATION COMPONENT (App)
// =================================================================

const App: React.FC = () => {
      return (
            <div className="space-y-6 p-8">
                  <h2 className="text-3xl font-bold text-gray-900">Welcome back, {MOCK_USER.name}!</h2>
                  <div className="grid gap-6 sm:grid-cols-3">
                        <Card className="flex flex-col items-start space-y-2 px-4">
                              <History size={24} className="text-blue-600" />
                              <p className="text-sm text-gray-500">Total Orders</p>
                              <p className="text-2xl font-bold">{MOCK_ORDERS.length}</p>
                        </Card>
                        <Card className="flex flex-col items-start space-y-2 px-4">
                              <Ticket size={24} className="text-green-600" />
                              <p className="text-sm text-gray-500">Active Coupons</p>
                              <p className="text-2xl font-bold">{MOCK_COUPONS.filter((c) => c.valid).length}</p>
                        </Card>
                        <Card className="flex flex-col items-start space-y-2 px-4">
                              <Truck size={24} className="text-orange-600" />
                              <p className="text-sm text-gray-500">Pending Shipment</p>
                              <p className="text-2xl font-bold">
                                    {
                                          MOCK_ORDERS.filter((o) => o.status === "Shipped" || o.status === "Processing")
                                                .length
                                    }
                              </p>
                        </Card>
                  </div>

                  <Card>
                        <h3 className="text-xl font-bold mb-4 border-b pb-2">Recent Orders</h3>
                        {MOCK_ORDERS.slice(0, 2).map((order) => (
                              <div
                                    key={order.id}
                                    className="flex justify-between items-center py-3 border-b last:border-b-0"
                              >
                                    <div>
                                          <p className="font-semibold text-gray-900">{order.id}</p>
                                          <p className="text-sm text-gray-500">
                                                {order.date} • {order.items} items
                                          </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                          <Badge>{order.status}</Badge>
                                          <Button variant="link" className="hidden sm:block">
                                                View Details
                                          </Button>
                                    </div>
                              </div>
                        ))}
                  </Card>
            </div>
      );
};

export default App;

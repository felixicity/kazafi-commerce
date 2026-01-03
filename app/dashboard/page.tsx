"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
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

const App: React.FC = () => {
      const dashboardCard = [
            {
                  title: "Total Orders",
                  icon: <History size={24} />,
                  value: MOCK_ORDERS.length,
            },
            {
                  title: "Active Coupons",
                  icon: <Ticket size={24} />,
                  value: MOCK_COUPONS.filter((c) => c.valid).length,
            },
            {
                  title: "Pending Shipment",
                  icon: <Truck size={24} />,
                  value: MOCK_ORDERS.filter((o) => o.status === "Shipped" || o.status === "Processing").length,
            },
      ];

      return (
            <div className="space-y-6 p-8">
                  <h2 className="text-xl font-bold text-gray-900">Welcome back, {MOCK_USER.name}!</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {dashboardCard.map((card) => (
                              <Card key={card.title} className="flex flex-col items-start space-y-2 px-4">
                                    <div className="flex items-center space-x-2">
                                          {card.icon}
                                          <p className="text-sm text-gray-500">{card.title}</p>
                                    </div>
                                    <p className="text-2xl font-bold">{card.value}</p>
                              </Card>
                        ))}
                  </div>

                  <Card className="p-8">
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
                                          <Badge variant={order.status.toLowerCase()}>{order.status}</Badge>
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

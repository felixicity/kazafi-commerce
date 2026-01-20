"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useDashboard } from "@/components/features/client/dashboardWrapper";
import {
      History,
      Ticket,
      Truck, // <-- FIX: Added missing Truck import
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { MOCK_COUPONS } from "@/lib/store/cart-store";
import { Badge } from "@/components/ui/badge";
import { getUserOrders } from "@/lib/mutations/order";
import { CustomerOrder } from "@/lib/types";

const App: React.FC = () => {
      const { userData } = useDashboard();
      const { data: ordersData, isLoading: ordersLoading } = useQuery<CustomerOrder[]>({
            queryKey: ["orders"],
            queryFn: getUserOrders, // Ensure this function is also typed to return Promise<CustomerOrder[]>
      });

      const totalOrders = ordersData ? ordersData.length : 0;

      const dashboardCard = [
            {
                  title: "Total Orders",
                  icon: <History size={24} />,
                  value: totalOrders || 0,
            },
            {
                  title: "Active Coupons",
                  icon: <Ticket size={24} />,
                  value: MOCK_COUPONS.filter((c) => c.valid).length || 0,
            },
            {
                  title: "Pending Shipment",
                  icon: <Truck size={24} />,
                  value:
                        ordersData?.filter(
                              (order) =>
                                    order.status === "pending" ||
                                    order.status === "shipped" ||
                                    order.status === "processing",
                        ).length || 0,
            },
      ];

      return (
            <div className="space-y-6 p-8">
                  <h2 className="text-xl font-bold text-gray-900">Welcome back, {userData?.name || userData?.email}</h2>
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

                  {ordersData && (
                        <Card className="p-8">
                              <h3 className="text-xl font-bold mb-4 border-b pb-2">Recent Orders</h3>
                              {ordersData?.slice(0, 5).map((order) => (
                                    <div
                                          key={order._id}
                                          className="flex justify-between items-center py-3 border-b last:border-b-0"
                                    >
                                          <div>
                                                <p className="font-semibold text-gray-900">#PO-{order?._id}</p>
                                                <p className="text-sm text-gray-500">
                                                      {new Date(order.createdAt).toLocaleDateString()}{" "}
                                                      {new Date(order.createdAt).toLocaleTimeString()} •{" "}
                                                      {order.items?.length} items
                                                </p>
                                          </div>
                                          <div className="flex items-center gap-4">
                                                <Badge variant={order.status}>{order.status}</Badge>
                                                <Button variant="link" className="hidden sm:block">
                                                      View Details
                                                </Button>
                                          </div>
                                    </div>
                              ))}
                        </Card>
                  )}
            </div>
      );
};

export default App;

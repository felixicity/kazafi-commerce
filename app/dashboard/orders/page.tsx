"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getUserOrders } from "@/lib/mutations/order";

import {
      Drawer,
      DrawerClose,
      DrawerContent,
      DrawerDescription,
      DrawerFooter,
      DrawerHeader,
      DrawerTitle,
      DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const OrderHistoryView: React.FC = () => {
      const isMobile = useIsMobile();

      const { data: ordersData, isLoading: ordersLoading } = useQuery({
            queryKey: ["orders"],
            queryFn: getUserOrders,
      });

      return (
            <div className="space-y-6 space-x-12 p-8">
                  <h2 className="text-xl font-bold text-gray-900">Your Orders</h2>
                  <div className="flex flex-col gap-12">
                        {ordersData?.map((order) => (
                              <Card key={order._id} className="p-4 overflow-hidden">
                                    <CardTitle>
                                          {order.status !== "pending"
                                                ? `${order.status} on ${new Date(order.createdAt).toLocaleDateString()}`
                                                : "Order is still pending"}
                                    </CardTitle>
                                    <CardContent>
                                          <div className="flex justify-between items-center">
                                                <div className="flex gap-2">
                                                      <Image
                                                            src={order.items[0].product.imageURLs[0]}
                                                            height={1000}
                                                            width={1000}
                                                            alt={order.color}
                                                      />
                                                </div>
                                                <div>
                                                      <Drawer>
                                                            <DrawerTrigger>
                                                                  <Button variant="link" className="p-0">
                                                                        Details
                                                                        <ChevronRight
                                                                              size={14}
                                                                              className="inline ml-1"
                                                                        />
                                                                  </Button>
                                                            </DrawerTrigger>
                                                            <DrawerContent>
                                                                  <DrawerHeader>
                                                                        <DrawerTitle>#PO-{order._id}</DrawerTitle>
                                                                        <DrawerDescription>
                                                                              {new Date(
                                                                                    order.createdAt
                                                                              ).toLocaleDateString()}{" "}
                                                                              {new Date(
                                                                                    order.createdAt
                                                                              ).toLocaleTimeString()}
                                                                        </DrawerDescription>
                                                                  </DrawerHeader>
                                                                  <p>Order status: {order.status}</p>
                                                                  <DrawerFooter>
                                                                        <DrawerClose>Close</DrawerClose>
                                                                  </DrawerFooter>
                                                            </DrawerContent>
                                                      </Drawer>
                                                </div>
                                          </div>
                                    </CardContent>
                              </Card>
                        ))}
                  </div>
            </div>
      );
};
export default OrderHistoryView;

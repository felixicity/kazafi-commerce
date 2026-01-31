"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { getUserOrders } from "@/lib/mutations/order";
import {
      Sheet,
      SheetContent,
      SheetDescription,
      SheetTrigger,
      SheetHeader,
      SheetTitle,
      SheetFooter,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { CustomerOrder } from "@/lib/types";
import { Spinner } from "@/components/ui/spinner";
import { IconDownload } from "@tabler/icons-react";
import { downloadOrderReceipt } from "@/lib/mutations/order";

const OrderHistoryView: React.FC = () => {
      const isMobile = useIsMobile();

      const { data: ordersData, isFetching: ordersisFetching } = useQuery<CustomerOrder[]>({
            queryKey: ["orders"],
            queryFn: getUserOrders, // Ensure this function is also typed to return Promise<CustomerOrder[]>
      });

      const { mutate: downloadReceipt, isPending } = useMutation({
            mutationKey: ["orders"],
            mutationFn: downloadOrderReceipt,
      });

      if (ordersisFetching) {
            return (
                  <div className="grid place-items-center">
                        {" "}
                        <div>
                              Fetching Orders... <Spinner />
                        </div>
                  </div>
            );
      }

      const handleDownloadReceipt = (orderId: string) => {
            downloadReceipt(orderId);
      };

      return (
            <div className="space-y-6  p-4 lg:p-8">
                  <h2 className="text-xl font-bold text-gray-900">Your Orders</h2>
                  <div className="flex flex-col gap-4 lg:gap-12">
                        {ordersData?.map((order) => {
                              const hasUnreviewedItems =
                                    order.status === "delivered" && order.items?.some((item) => !item.isReviewed);
                              return (
                                    <>
                                          <Card key={order._id} className="p-4 lg:p-8 overflow-hidden">
                                                <CardTitle>
                                                      {order.status !== "pending"
                                                            ? `${order.status} on ${new Date(order.createdAt).toLocaleDateString()}`
                                                            : "Order is still pending"}{" "}
                                                      {order.status === "delivered" && (
                                                            <span>
                                                                  (
                                                                  {order.items.filter((item) => !item.isReviewed)
                                                                        .length >= 1
                                                                        ? order.items.filter((item) => !item.isReviewed)
                                                                                .length
                                                                        : "No"}{" "}
                                                                  item awaiting review )
                                                            </span>
                                                      )}
                                                </CardTitle>
                                                <CardContent>
                                                      <div className="flex justify-between items-center">
                                                            <div className="grid grid-cols-3 grid-flow-col gap-2 lg:grid-cols-6">
                                                                  {order.items.map((item) => (
                                                                        <div
                                                                              key={item.product._id}
                                                                              className="max-w-16 lg:max-w-xs border rounded-md"
                                                                        >
                                                                              <Image
                                                                                    src={item.product.imageURLs[0]}
                                                                                    height={1000}
                                                                                    width={1000}
                                                                                    alt={item.color}
                                                                                    className="w-full"
                                                                              />
                                                                        </div>
                                                                  ))}
                                                            </div>
                                                            <div className="flex flex-col items-start gap-3">
                                                                  <p className="text-gray-600 ">
                                                                        {order.totalQuantity}{" "}
                                                                        {order.totalQuantity > 1 ? "items" : "item"}
                                                                  </p>
                                                                  <p className="text-orange-500 font-semibold">
                                                                        {new Intl.NumberFormat("en-NG", {
                                                                              style: "currency",
                                                                              currency: "NGN",
                                                                        }).format(order?.totalAmount)}
                                                                  </p>

                                                                  {hasUnreviewedItems && (
                                                                        <Button
                                                                              size="sm"
                                                                              className="bg-orange-500"
                                                                              asChild
                                                                        >
                                                                              <Link href={`./orders/${order._id}`}>
                                                                                    Leave a review
                                                                              </Link>
                                                                        </Button>
                                                                  )}
                                                                  {
                                                                        <Sheet>
                                                                              <SheetTrigger asChild>
                                                                                    <Button
                                                                                          variant="link"
                                                                                          className="p-0"
                                                                                    >
                                                                                          Details
                                                                                          <ChevronRight
                                                                                                size={14}
                                                                                                className="inline ml-1"
                                                                                          />
                                                                                    </Button>
                                                                              </SheetTrigger>
                                                                              <SheetContent
                                                                                    side={isMobile ? "bottom" : "right"}
                                                                                    className="bg-gray-50 overflow-y-scroll"
                                                                              >
                                                                                    <SheetHeader>
                                                                                          <SheetTitle>
                                                                                                #PO-{order._id}
                                                                                          </SheetTitle>
                                                                                          <SheetDescription>
                                                                                                {new Date(
                                                                                                      order.createdAt,
                                                                                                ).toLocaleDateString()}{" "}
                                                                                                {new Date(
                                                                                                      order.createdAt,
                                                                                                ).toLocaleTimeString()}
                                                                                          </SheetDescription>
                                                                                    </SheetHeader>
                                                                                    <div className="flex flex-col p-4 gap-8">
                                                                                          <div className="bg-white px-4 py-8 flex flex-col gap-4">
                                                                                                <p>
                                                                                                      Order Status:{" "}
                                                                                                      {order.status}
                                                                                                </p>
                                                                                                <Button className="w-full rounded-3xl bg-orange-400 text-white">
                                                                                                      Track
                                                                                                </Button>
                                                                                          </div>
                                                                                          <div className="flex flex-col bg-white py-4">
                                                                                                <p className="px-4">
                                                                                                      {
                                                                                                            order.totalQuantity
                                                                                                      }{" "}
                                                                                                      {order.totalQuantity >
                                                                                                      1
                                                                                                            ? "items"
                                                                                                            : "item"}
                                                                                                </p>
                                                                                                <div className="grid grid-cols-3">
                                                                                                      {order.items.map(
                                                                                                            (item) => (
                                                                                                                  <div
                                                                                                                        key={
                                                                                                                              item
                                                                                                                                    .product
                                                                                                                                    ._id
                                                                                                                        }
                                                                                                                  >
                                                                                                                        <Image
                                                                                                                              src={
                                                                                                                                    item
                                                                                                                                          .product
                                                                                                                                          .imageURLs[0]
                                                                                                                              }
                                                                                                                              height={
                                                                                                                                    1000
                                                                                                                              }
                                                                                                                              width={
                                                                                                                                    1000
                                                                                                                              }
                                                                                                                              alt="produ t image"
                                                                                                                              className="w-full"
                                                                                                                        />
                                                                                                                  </div>
                                                                                                            ),
                                                                                                      )}
                                                                                                </div>
                                                                                          </div>
                                                                                    </div>
                                                                                    <SheetFooter>
                                                                                          <Button
                                                                                                className="w-full"
                                                                                                onClick={() =>
                                                                                                      handleDownloadReceipt(
                                                                                                            order._id,
                                                                                                      )
                                                                                                }
                                                                                          >
                                                                                                {isPending ? (
                                                                                                      <Spinner />
                                                                                                ) : (
                                                                                                      <IconDownload />
                                                                                                )}
                                                                                                Print Receipt
                                                                                          </Button>
                                                                                    </SheetFooter>
                                                                              </SheetContent>
                                                                        </Sheet>
                                                                  }
                                                            </div>
                                                      </div>
                                                </CardContent>
                                          </Card>
                                    </>
                              );
                        })}
                  </div>
            </div>
      );
};
export default OrderHistoryView;

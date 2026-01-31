"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSingleOrder } from "@/lib/mutations/order";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { ReviewDialog } from "@/components/features/client/review-dialog";

export default function SingleOrder() {
      const { id } = useParams();
      const [showReviewDialog, setShowReviewDialog] = useState<boolean>(false);
      const [productId, setProductId] = useState<string>("");

      const {
            data: order,
            error,
            isError,
            isFetching,
      } = useQuery({
            queryKey: ["order", id],
            queryFn: () => getSingleOrder(String(id)),
      });

      const handleShowDialog = (id: string) => {
            setProductId(id);
            setShowReviewDialog(true);
      };

      if (isFetching) {
            return <div>loading order...</div>;
      }

      if (isError) {
            return <div> Failed:{error.message}</div>;
      }

      const orderItems = order.items;

      return (
            <div className="p-4">
                  <h2 className="text-2xl font-semibold">Review Items</h2>
                  <div className="py-4">
                        {
                              <ReviewDialog
                                    showReviewDialog={showReviewDialog}
                                    setShowReviewDialog={setShowReviewDialog}
                                    productId={productId}
                                    orderId={id?.toString()}
                              />
                        }
                        {orderItems.map(
                              (item: {
                                    product: { imageURLs: string[]; _id: string; price: number };
                                    quantity: number;
                                    productId: string;
                              }) => (
                                    <Card key={item?.product._id}>
                                          <CardContent className="flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                      <Image
                                                            src={item.product.imageURLs[0]}
                                                            alt={item.product._id}
                                                            width={200}
                                                            height={200}
                                                      />
                                                      <div className="flex flex-col items-center gap-8">
                                                            <p className="text-lg">
                                                                  quantity:{" "}
                                                                  <span className="font-semibold">{item.quantity}</span>
                                                            </p>
                                                            <p className="font-bold text-xl">
                                                                  {new Intl.NumberFormat("en-NG", {
                                                                        style: "currency",
                                                                        currency: "NGN",
                                                                  }).format(item.product.price)}
                                                            </p>
                                                      </div>
                                                </div>

                                                <CardAction
                                                      className="bg-orange-500 text-white rounded-lg py-1 px-3 cursor-pointer"
                                                      onClick={() => handleShowDialog(item.productId)}
                                                >
                                                      Leave a review
                                                </CardAction>
                                          </CardContent>
                                    </Card>
                              ),
                        )}
                  </div>
            </div>
      );
}

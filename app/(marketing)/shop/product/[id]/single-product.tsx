"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
// import { MaterialItem, ProductSize } from "@/lib/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
      IconCheck,
      IconRotateClockwise,
      IconTag,
      IconChargingPile,
      IconShoppingBag,
      IconTruckDelivery,
      IconStarFilled,
      IconStarHalfFilled,
      IconStar,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Rating } from "@/components/features/client/rating";
import { addItemToCart } from "@/lib/mutations/cart";
import { Product } from "@/lib/types";
import { fetchProductReviews } from "@/lib/mutations/review";

export interface Review {
      _id?: string;
      rating: number;
      image?: string;
      comment: string;
      user?: { email: string; addresses: [{ isDefault: boolean; country: string }] } | null;
}

export function SingleProductPage({
      product,
      selectedColor,
      setSelectedColor,
      selectedSize,
      setSelectedSize,
      quantity,
      setQuantity,
}: {
      product: Product;
      selectedColor: string;
      setSelectedColor: (color: string) => void;
      selectedSize: string;
      setSelectedSize: (size: string) => void;
      quantity: number;
      setQuantity: (quantity: number) => void;
}) {
      const router = useRouter();
      const queryClient = useQueryClient();

      const {
            data: reviewsData,
            isError: fetchReviewIsError,
            error,
      } = useQuery({
            queryKey: ["reviews", product._id],
            queryFn: () => fetchProductReviews(product._id),
            enabled: !!product?._id,
      });

      const { mutate, isError, isSuccess } = useMutation({
            mutationFn: addItemToCart,
            onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["cart"] });
                  // Reset the quantity to default upon success
                  setQuantity(1);
            },
      });

      useEffect(() => {
            if (isSuccess) {
                  toast.success(`Item added to cart successfully!`);
            }
      }, [isSuccess]);

      if (fetchReviewIsError) {
            return <div>An error Occured:{error.message}</div>;
      }

      const number_of_reviews = reviewsData?.length;
      const avg_rating =
            reviewsData?.length > 0
                  ? Number(
                          (
                                reviewsData.reduce(
                                      (sum: number, review: { rating: number }) => sum + review.rating,
                                      0,
                                ) / number_of_reviews
                          ).toFixed(1),
                    )
                  : 1;

      const handleAddToCart = () => {
            const variation = product?.variations.find((variant) => variant.color === selectedColor);
            if (!variation) {
                  toast.error("Please select a valid color variant");
                  return;
            }
            // Mock add to cart logic
            mutate({ _id: product._id, variation, quantity });
      };

      if (isError) {
            router.push("/login");
      }

      if (!product || product.variations.length === 0) {
            return "No product Found"; // Or return null
      }

      const productImageURL =
            product?.variations.find((v) => v.color === selectedColor)?.imageURLs ||
            "/images/space-saving-furniture-2-tables-39950917107934-Photoroom.png";

      const productPrice = product?.variations.find((variation) => variation.color === selectedColor)?.price || 0;

      return (
            <div className="max-w-7xl mx-auto p-6 sm:p-10 lg:py-12">
                  {/* {isSuccess && toast.success(`Item added to cart successfully!`)} */}
                  <div className="grid grid-cols-1 grid-rows-2 gap-6 lg:grid-cols-2 lg:gap-16">
                        {/* Column 1: Product Image Gallery */}
                        <div className="lg:sticky lg:top-8">
                              <div className="aspect-4/5 bg-gray-100 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                                    {
                                          <Image
                                                src={productImageURL[0]}
                                                alt={`${product.name} - ${selectedColor}`}
                                                width={2000}
                                                height={2000}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                                          />
                                    }
                              </div>
                              {/* Mock small gallery thumbnails */}
                              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                                    {product.variations.map(({ _id, imageURLs = [] }) => (
                                          <Image
                                                key={_id}
                                                src={
                                                      imageURLs[0] ||
                                                      "/images/space-saving-furniture-2-tables-39950917107934-Photoroom.png"
                                                }
                                                alt={product.name}
                                                width={1000}
                                                height={1000}
                                                quality={75}
                                                className={`w-20 h-24 object-cover rounded-xl border-2 cursor-pointer transition-all ${
                                                      imageURLs[0] === productImageURL[0]
                                                            ? "border-black"
                                                            : "border-gray-200 hover:border-gray-400"
                                                }`}
                                          />
                                    ))}
                              </div>
                        </div>

                        {/* Column 2: Product Details and Options */}
                        <div className="lg:space-y-8">
                              <div className="border-b pb-4 space-y-3">
                                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                          {product.category}
                                    </span>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                          {product.name}
                                    </h1>

                                    <div className="flex items-baseline pt-2 font-semibold text-3xl">
                                          {/* <span className={priceClasses}>{displayPrice}</span> */}
                                          {new Intl.NumberFormat("en-NG", {
                                                style: "currency",
                                                currency: "NGN",
                                          }).format(productPrice)}
                                    </div>

                                    <div className="pt-2 flex items-center gap-4">
                                          <Rating
                                                rating={avg_rating}
                                                count={number_of_reviews}
                                                avg_rating={avg_rating}
                                          />
                                    </div>
                              </div>

                              <Separator />

                              {/* Color Selector */}
                              <div className="space-y-4">
                                    <h2 className="text-xl font-bold text-gray-800">
                                          Color:{" "}
                                          <span className="font-medium text-black">
                                                {product.variations.find((v) => v.color === selectedColor)?.color}
                                          </span>
                                    </h2>
                                    <div className="flex flex-wrap gap-4">
                                          {product.variations.map(({ color = "Unknown", hexCode }) => (
                                                <div
                                                      key={color}
                                                      onClick={() => setSelectedColor(color)}
                                                      style={{
                                                            backgroundColor: hexCode,
                                                            borderColor:
                                                                  hexCode === "#FFFFFF" ? "#e5e7eb" : "transparent",
                                                      }}
                                                      className={`w-12 h-12 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                                                            selectedColor === color
                                                                  ? "ring-4 ring-offset-2 ring-black shadow-md"
                                                                  : "hover:ring-2 ring-gray-400"
                                                      }`}
                                                      title={color}
                                                />
                                          ))}
                                    </div>
                              </div>

                              {/* Size Selector */}
                              {product.category === "clothing" && (
                                    <>
                                          <div className="space-y-4">
                                                <h2 className="text-xl font-bold text-gray-800">
                                                      Size:{" "}
                                                      <span className="font-medium text-black">{selectedSize}</span>
                                                </h2>
                                                <div className="flex flex-wrap gap-3">
                                                      {product?.variations
                                                            .find((v) => v.color === selectedColor)
                                                            ?.sizes?.map((size) => (
                                                                  <Button
                                                                        key={size}
                                                                        variant={
                                                                              selectedSize === size
                                                                                    ? "default"
                                                                                    : "outline"
                                                                        }
                                                                        className={`h-11 w-16 text-sm font-bold ${
                                                                              selectedSize === size
                                                                                    ? "bg-black text-white"
                                                                                    : "bg-white hover:bg-gray-100"
                                                                        }`}
                                                                        onClick={() => setSelectedSize(size)}
                                                                  >
                                                                        {size}
                                                                  </Button>
                                                            ))}
                                                </div>
                                                <p className="text-sm text-gray-500 hover:underline cursor-pointer">
                                                      Size Guide
                                                </p>
                                          </div>

                                          <Separator />
                                    </>
                              )}

                              {/* Add to Cart Section */}
                              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    {/* Quantity Selector Mock */}
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-14 w-32 shrink-0">
                                          <Button
                                                variant="ghost"
                                                className="h-full w-1/3 rounded-none border-r border-gray-300 text-xl font-light"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                          >
                                                -
                                          </Button>
                                          <Input
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                                className="w-1/3 text-center border-none p-0 focus:ring-0 h-full text-lg"
                                          />
                                          <Button
                                                variant="ghost"
                                                className="h-full w-1/3 rounded-none border-l border-gray-300 text-xl font-light"
                                                onClick={() => setQuantity(quantity + 1)}
                                          >
                                                +
                                          </Button>
                                    </div>

                                    <Button
                                          variant="default"
                                          className="flex-1 h-14 text-lg font-bold shadow-lg shadow-black/30 hover:shadow-xl"
                                          onClick={handleAddToCart}
                                    >
                                          <IconShoppingBag size={50} className="mr-2" />
                                          Add to Cart
                                    </Button>
                              </div>

                              {/* Shipping & Returns */}
                              <div className="text-sm text-gray-600 space-y-1 pt-4">
                                    <div className="flex items-center">
                                          <IconTruckDelivery size={32} className="mr-2 text-gray-400" />
                                          Free shipping on all orders over{" "}
                                          {new Intl.NumberFormat("en-NG", {
                                                style: "currency",
                                                currency: "NGN",
                                          }).format(30000)}
                                          .
                                    </div>
                                    <div className="flex items-center">
                                          <IconRotateClockwise size={32} className="mr-2 text-gray-400" />
                                          90-day hassle-free returns.
                                    </div>
                              </div>

                              <Separator />

                              {/* Detailed Description */}
                              <div className="space-y-4 pt-2">
                                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Product Details</h2>
                                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                              </div>

                              {/* Materials Section (Requested Detail) */}
                              {product?.materials && (
                                    <div className="space-y-4 pt-2">
                                          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                                                Materials & Care
                                          </h2>
                                          <div className="grid grid-cols-2 gap-4">
                                                {product?.materials.map((item, index) => (
                                                      <div
                                                            key={index}
                                                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg shadow-sm"
                                                      >
                                                            <div className="text-black">
                                                                  {item.title == "Composition" ? (
                                                                        <IconCheck />
                                                                  ) : item.title == "Weight" ? (
                                                                        <IconChargingPile />
                                                                  ) : item.title == "Sourcing" ? (
                                                                        <IconTag />
                                                                  ) : item.title == "Care" ? (
                                                                        <IconRotateClockwise />
                                                                  ) : null}
                                                            </div>
                                                            <div>
                                                                  <p className="text-sm font-semibold text-gray-800">
                                                                        {item.title}
                                                                  </p>
                                                                  <p className="text-xs text-gray-600">{item.detail}</p>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              )}
                        </div>
                  </div>
                  <section className="py-8">
                        <h2 className="text-xl font-semibold">Customer Reviews ({avg_rating})</h2>
                        <Separator />

                        {reviewsData?.map((review: Review) => (
                              <div key={review._id}>
                                    <div className="pt-2 text-lg">{`${review.user?.email} in ${review.user?.addresses?.find((addr) => addr.isDefault)?.country || "Unknown Location"}`}</div>
                                    <div className="flex items-center gap-1 py-2">
                                          {[...Array(5)].map((_, index) => {
                                                const starNumber = index + 1;
                                                if (review.rating >= starNumber) {
                                                      return <IconStarFilled key={index} className="w-5 h-5" />;
                                                } else if (review.rating > index && review.rating < starNumber) {
                                                      return (
                                                            <IconStarHalfFilled
                                                                  key={index}
                                                                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                                            />
                                                      );
                                                } else {
                                                      return <IconStar key={index} className="w-5 h-5 text-gray-300" />;
                                                }
                                          })}

                                          <span className="ml-2 text-sm font-medium text-gray-600">
                                                {review.rating}
                                          </span>
                                    </div>
                                    <div>
                                          <Image
                                                src={review.image || "photo"}
                                                alt={review.image || "photo"}
                                                height={200}
                                                width={200}
                                          />
                                    </div>
                                    <p className="py-8">{review.comment}</p>
                                    <Separator />
                              </div>
                        ))}
                  </section>
            </div>
      );
}

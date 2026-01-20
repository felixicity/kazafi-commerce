"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import Image from "next/image";
// ProductCard (Refined Button/Styling usage)
export const ProductCard = ({ product, viewMode }: { product: Product; viewMode: string }) => {
      // 1. Safe access: Use optional chaining and provide a fallback string
      const firstVariation = product.variations?.[0];
      const [selectedColor, setSelectedColor] = useState<string>(product.variations?.[0]?.color ?? "");
      // 2. Early return if data is missing to satisfy TS "Object is possibly undefined"

      if (!firstVariation || typeof firstVariation.price !== "number") {
            return null;
      }
      // 3. Calculation Fix: Always perform math on numbers, not strings.
      // Use raw numbers for calculation, and Intl.NumberFormat for display.
      const basePrice = firstVariation.price;
      const discountPercent = firstVariation.discount || 0;
      const hasDiscount = discountPercent > 0;

      const discountedPrice = hasDiscount ? basePrice - basePrice * (discountPercent / 100) : basePrice;

      const currencyFormatter = new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
      });

      const priceClasses = hasDiscount ? "text-sm text-gray-500 line-through" : "text-lg font-semibold text-gray-900";

      const displayPrice = currencyFormatter.format(basePrice);
      const salePrice = hasDiscount ? (
            <span className="text-lg font-semibold text-red-600 ml-2">{currencyFormatter.format(discountedPrice)}</span>
      ) : null;

      // 4. Dynamic Variation: Find the variation matching the selected color for the image
      const activeVariation = product.variations.find((v) => v.color === selectedColor) || firstVariation;

      if (!activeVariation || !activeVariation.imageURLs || activeVariation.imageURLs.length === 0) {
            return null; // Or a placeholder "No Image Available" div
      }

      // 3. Now TS knows imageURLs[0] is safe
      const mainImage = activeVariation.imageURLs[0];

      if (viewMode === "list") {
            return (
                  <div className="flex flex-col md:flex-row gap-6 p-4 border rounded-xl hover:shadow-lg transition-shadow bg-white">
                        <div className="w-full md:w-48 shrink-0">
                              <Image
                                    src={mainImage} // Uses active color's image
                                    alt={product.name}
                                    className="w-full h-auto aspect-4/5 rounded-md object-cover"
                                    width={300}
                                    height={300}
                              />
                        </div>
                        {/* ... rest of list JSX */}
                  </div>
            );
      }

      return (
            <div className="flex flex-col border rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white group">
                  <div className="relative overflow-hidden">
                        <Image
                              src={activeVariation.imageURLs[0]}
                              alt={product.name}
                              className="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              width={300}
                              height={300}
                        />
                        {hasDiscount && (
                              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                    -{discountPercent}%
                              </span>
                        )}
                  </div>

                  <div className="p-4 space-y-2 flex flex-col grow">
                        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                        <div className="flex items-baseline pt-1">
                              <span className={priceClasses}>{displayPrice}</span>
                              {salePrice}
                        </div>

                        <div className="flex gap-2 pt-2">
                              {product.variations.slice(0, 4).map((variation) => (
                                    <button // Changed div to button for better accessibility
                                          key={variation._id}
                                          type="button"
                                          style={{ backgroundColor: variation.color }}
                                          className={`w-4 h-4 rounded-full border cursor-pointer ${
                                                selectedColor === variation.color
                                                      ? "ring-2 ring-offset-1 ring-black"
                                                      : "hover:ring-1 ring-gray-400"
                                          }`}
                                          onClick={() => setSelectedColor(variation?.color)}
                                          title={variation.color}
                                    />
                              ))}
                        </div>
                  </div>
            </div>
      );
};

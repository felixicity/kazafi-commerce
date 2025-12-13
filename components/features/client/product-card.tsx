"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import { Rating } from "./rating";
import { Product, ViewMode } from "@/lib/types";
import Image from "next/image";
// ProductCard (Refined Button/Styling usage)
export const ProductCard: React.FC<{ product: Product; viewMode: ViewMode }> = ({ product, viewMode }) => {
      const [selectedColor, setSelectedColor] = useState<string>(product.variations[0].color);

      const priceClasses = product.variations[0].discount
            ? "text-sm text-gray-500 line-through"
            : "text-lg font-semibold text-gray-900";
      const displayPrice = new Intl.NumberFormat("NGN", { style: "currency", currency: "NGN" }).format(
            parseFloat(product.variations[0].price.toFixed(2))
      );
      const salePrice = product.variations[0].discount ? (
            <span className="text-lg font-semibold text-red-600 ml-2">
                  {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
                        parseFloat(
                              (
                                    product.variations[0].price.toFixed(2) -
                                    (product.variations[0].discount / 100) * product.variations[0].price.toFixed(2)
                              ).toFixed(2)
                        )
                  )}
            </span>
      ) : null;

      if (viewMode === "list") {
            return (
                  <div className="flex flex-col md:flex-row gap-6 p-4 border rounded-xl hover:shadow-lg transition-shadow bg-white">
                        <div className="w-full md:w-48 shrink-0">
                              <Image
                                    src={product.variations[0].imageURLs[0]}
                                    alt={product.name}
                                    className="w-full h-auto aspect-4/5 rounded-md"
                                    width={300}
                                    height={300}
                              />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                              <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                                    <div className="flex items-center gap-2">
                                          <Rating rating={5} count={34} />
                                    </div>
                              </div>
                              <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <div>
                                          <span className={priceClasses}>{displayPrice}</span>
                                          {salePrice}
                                    </div>
                                    <div className="flex items-center gap-2 mt-3 md:mt-0">
                                          {product.variations.map((variation) => (
                                                <div
                                                      key={variation._id}
                                                      style={{ backgroundColor: variation.color }}
                                                      className={`w-5 h-5 rounded-full border cursor-pointer ${
                                                            selectedColor === variation.color
                                                                  ? "ring-2 ring-offset-2 ring-black"
                                                                  : "hover:ring-1 ring-gray-400"
                                                      }`}
                                                      onClick={() => setSelectedColor(variation.color)}
                                                      title={variation.color}
                                                />
                                          ))}
                                          <Button variant="default" size="sm" className="ml-4">
                                                View Options
                                          </Button>
                                    </div>
                              </div>
                        </div>
                  </div>
            );
      }

      // Grid View (Default)
      return (
            <div className="flex flex-col border rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white group">
                  <div className="relative overflow-hidden">
                        <Image
                              src={product.variations[0].imageURLs[0]}
                              alt={product.name}
                              className="w-full h-auto aspect-5/5 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              width={300}
                              height={300}
                        />
                        {product.originalPrice && (
                              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                    SALE
                              </span>
                        )}
                  </div>

                  <div className="p-4 space-y-2 flex flex-col grow">
                        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                        <div className="flex items-center gap-2">
                              <Rating rating={5} count={34} />
                        </div>
                        <div className="flex items-baseline pt-1">
                              <span className={priceClasses}>{displayPrice}</span>
                              {salePrice}
                        </div>

                        {/* Color Variants */}
                        <div className="flex gap-2 pt-2">
                              {product.variations.slice(0, 4).map((variation) => (
                                    <div
                                          key={variation.color}
                                          style={{ backgroundColor: variation.color }}
                                          className={`w-4 h-4 rounded-full border cursor-pointer ${
                                                selectedColor === variation.color
                                                      ? "ring-2 ring-offset-1 ring-black"
                                                      : "hover:ring-1 ring-gray-400"
                                          }`}
                                          onClick={() => setSelectedColor(variation.color)}
                                          title={variation.color}
                                    />
                              ))}
                              {product.variations.length > 4 && (
                                    <span className="text-xs text-gray-500 self-end">
                                          +{product.variations.length - 4}
                                    </span>
                              )}
                        </div>
                  </div>
            </div>
      );
};

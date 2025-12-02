"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Rating } from "./rating";
import { Product, ViewMode } from "@/lib/types";
// ProductCard (Refined Button/Styling usage)
export const ProductCard: React.FC<{ product: Product; viewMode: ViewMode }> = ({ product, viewMode }) => {
      const [selectedColor, setSelectedColor] = useState<string>(product.variants.color[0].hex);

      const priceClasses = product.originalPrice
            ? "text-sm text-gray-500 line-through"
            : "text-lg font-semibold text-gray-900";
      const displayPrice = product.originalPrice
            ? `$${product.originalPrice.toFixed(2)}`
            : `$${product.price.toFixed(2)}`;
      const salePrice = product.originalPrice ? (
            <span className="text-lg font-semibold text-red-600 ml-2">${product.price.toFixed(2)}</span>
      ) : null;

      if (viewMode === "list") {
            return (
                  <div className="flex flex-col md:flex-row gap-6 p-4 border rounded-xl hover:shadow-lg transition-shadow bg-white">
                        <div className="w-full md:w-48 shrink-0">
                              <img
                                    src={product.imagePlaceholder}
                                    alt={product.name}
                                    className="w-full h-auto aspect-4/5  object-cover rounded-md"
                                    onError={(e) =>
                                          (e.currentTarget.src =
                                                "https://placehold.co/400x500/EEEEEE/333333?text=Product+Image")
                                    }
                              />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                              <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                                    <div className="flex items-center gap-2">
                                          <Rating rating={product.reviews.rating} />
                                          <span className="text-xs text-gray-500">({product.reviews.count})</span>
                                    </div>
                              </div>
                              <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <div>
                                          <span className={priceClasses}>{displayPrice}</span>
                                          {salePrice}
                                    </div>
                                    <div className="flex items-center gap-2 mt-3 md:mt-0">
                                          {product.variants.color.map((color) => (
                                                <div
                                                      key={color.hex}
                                                      style={{ backgroundColor: color.hex }}
                                                      className={`w-5 h-5 rounded-full border cursor-pointer ${
                                                            selectedColor === color.hex
                                                                  ? "ring-2 ring-offset-2 ring-black"
                                                                  : "hover:ring-1 ring-gray-400"
                                                      }`}
                                                      onClick={() => setSelectedColor(color.hex)}
                                                      title={color.name}
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
                        <img
                              src={product.imagePlaceholder}
                              alt={product.name}
                              className="w-full h-auto aspect-5/5 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              onError={(e) =>
                                    (e.currentTarget.src =
                                          "https://placehold.co/400x500/EEEEEE/333333?text=Product+Image")
                              }
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
                              <Rating rating={product.reviews.rating} />
                              <span className="text-xs text-gray-500">({product.reviews.count})</span>
                        </div>
                        <div className="flex items-baseline pt-1">
                              <span className={priceClasses}>{displayPrice}</span>
                              {salePrice} (33k sold)
                        </div>

                        {/* Color Variants */}
                        <div className="flex gap-2 pt-2">
                              {product.variants.color.slice(0, 4).map((color) => (
                                    <div
                                          key={color.hex}
                                          style={{ backgroundColor: color.hex }}
                                          className={`w-4 h-4 rounded-full border cursor-pointer ${
                                                selectedColor === color.hex
                                                      ? "ring-2 ring-offset-1 ring-black"
                                                      : "hover:ring-1 ring-gray-400"
                                          }`}
                                          onClick={() => setSelectedColor(color.hex)}
                                          title={color.name}
                                    />
                              ))}
                              {product.variants.color.length > 4 && (
                                    <span className="text-xs text-gray-500 self-end">
                                          +{product.variants.color.length - 4}
                                    </span>
                              )}
                        </div>
                  </div>
            </div>
      );
};

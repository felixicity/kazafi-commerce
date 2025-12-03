"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SingleProduct, ProductColor, ProductSize } from "@/lib/types";
import {
      IconCheck,
      IconRotateClockwise,
      IconTag,
      IconChargingPile,
      IconShoppingBag,
      IconTruckDelivery,
} from "@tabler/icons-react";
import { MOCK_PRODUCT_SINGLE } from "@/lib/store/cart-store";
import { Rating } from "@/components/features/client/rating";

// =================================================================
// PRODUCT DETAIL PAGE COMPONENT (The main content)
// =================================================================

const ProductDetailPage: React.FC<{ product: SingleProduct }> = ({ product }) => {
      const [selectedColor, setSelectedColor] = useState<ProductColor>(product.variants.color[0]);
      const [selectedSize, setSelectedSize] = useState<ProductSize>(product.variants.sizes[1]); // Default to Medium
      const [quantity, setQuantity] = useState<number>(1);

      const priceClasses = product.originalPrice
            ? "text-2xl text-gray-500 line-through font-normal"
            : "text-3xl font-bold text-gray-900";
      const displayPrice = product.originalPrice
            ? `$${product.originalPrice.toFixed(2)}`
            : `$${product.price.toFixed(2)}`;
      const salePrice = product.originalPrice ? (
            <span className="text-3xl font-bold text-red-600 ml-4">${product.price.toFixed(2)}</span>
      ) : null;

      const handleAddToCart = () => {
            // Mock add to cart logic
            const message = `Added ${quantity} x ${product.name} (Color: ${selectedColor.name}, Size: ${selectedSize}) to cart!`;
            alert(message); // Using a mock alert, replace with UI toast/modal in a real app
      };

      // Function to replace alert, since alerts are forbidden.
      const alert = (message: string) => {
            const modal = document.getElementById("custom-modal");
            const modalMessage = document.getElementById("modal-message");
            if (modal && modalMessage) {
                  modalMessage.textContent = message;
                  modal.classList.remove("hidden");
            }
      };

      return (
            <div className="min-h-screen sm:p-12">
                  <div className="max-w-7xl mx-auto p-6 sm:p-10 lg:py-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                              {/* Column 1: Product Image Gallery */}
                              <div className="lg:sticky lg:top-8">
                                    <div className="aspect-4/5 bg-gray-100 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                                          <img
                                                src={product.imagePlaceholder}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                                                onError={(e) =>
                                                      (e.currentTarget.src =
                                                            "https://placehold.co/800x1000/EEEEEE/333333?text=Product+Image")
                                                }
                                          />
                                    </div>
                                    {/* Mock small gallery thumbnails */}
                                    <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                                          {[1, 2, 3].map((i) => (
                                                <img
                                                      key={i}
                                                      src={`https://placehold.co/100x125/F3F4F6/9CA3AF?text=View+${i}`}
                                                      className={`w-20 h-24 object-cover rounded-xl border-2 cursor-pointer transition-all ${
                                                            i === 1
                                                                  ? "border-black"
                                                                  : "border-gray-200 hover:border-gray-400"
                                                      }`}
                                                />
                                          ))}
                                    </div>
                              </div>

                              {/* Column 2: Product Details and Options */}
                              <div className="space-y-8">
                                    <div className="border-b pb-4 space-y-3">
                                          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                {product.category}
                                          </span>
                                          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                                                {product.name}
                                          </h1>

                                          <div className="flex items-baseline pt-2">
                                                <span className={priceClasses}>{displayPrice}</span>
                                                {salePrice}
                                          </div>

                                          <div className="pt-2 flex items-center gap-4">
                                                <Rating rating={product.reviews.rating} count={product.reviews.count} />
                                          </div>
                                    </div>

                                    {/* Short Description */}
                                    <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>

                                    <Separator />

                                    {/* Color Selector */}
                                    <div className="space-y-4">
                                          <h2 className="text-xl font-bold text-gray-800">
                                                Color:{" "}
                                                <span className="font-medium text-black">{selectedColor.name}</span>
                                          </h2>
                                          <div className="flex flex-wrap gap-4">
                                                {product.variants.color.map((color) => (
                                                      <div
                                                            key={color.hex}
                                                            onClick={() => setSelectedColor(color)}
                                                            style={{
                                                                  backgroundColor: color.hex,
                                                                  borderColor:
                                                                        color.hex === "#FFFFFF"
                                                                              ? "#e5e7eb"
                                                                              : "transparent",
                                                            }}
                                                            className={`w-12 h-12 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                                                                  selectedColor.hex === color.hex
                                                                        ? "ring-4 ring-offset-2 ring-black shadow-md"
                                                                        : "hover:ring-2 ring-gray-400"
                                                            }`}
                                                            title={color.name}
                                                      />
                                                ))}
                                          </div>
                                    </div>

                                    {/* Size Selector */}
                                    <div className="space-y-4">
                                          <h2 className="text-xl font-bold text-gray-800">
                                                Size: <span className="font-medium text-black">{selectedSize}</span>
                                          </h2>
                                          <div className="flex flex-wrap gap-3">
                                                {product.variants.sizes.map((size) => (
                                                      <Button
                                                            key={size}
                                                            variant={selectedSize === size ? "default" : "outline"}
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

                                    {/* Add to Cart Section */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                          {/* Quantity Selector Mock */}
                                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-14 w-32 shrink-0">
                                                <Button
                                                      variant="ghost"
                                                      className="h-full w-1/3 rounded-none border-r border-gray-300 text-xl font-light"
                                                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
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
                                                      onClick={() => setQuantity((q) => q + 1)}
                                                >
                                                      +
                                                </Button>
                                          </div>

                                          <Button
                                                variant="default"
                                                className="flex-1 h-14 text-lg font-bold shadow-lg shadow-black/30 hover:shadow-xl"
                                                onClick={handleAddToCart}
                                          >
                                                <IconShoppingBag size={22} className="mr-2" />
                                                Add to Cart
                                          </Button>
                                    </div>

                                    {/* Shipping & Returns */}
                                    <div className="text-sm text-gray-600 space-y-1 pt-4">
                                          <div className="flex items-center">
                                                <IconTruckDelivery size={16} className="mr-2 text-gray-400" />
                                                Free shipping on all orders over $75.
                                          </div>
                                          <div className="flex items-center">
                                                <IconRotateClockwise size={16} className="mr-2 text-gray-400" />
                                                90-day hassle-free returns.
                                          </div>
                                    </div>

                                    <Separator />

                                    {/* Detailed Description */}
                                    <div className="space-y-4 pt-2">
                                          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                                                Product Details
                                          </h2>
                                          <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
                                    </div>

                                    {/* Materials Section (Requested Detail) */}
                                    <div className="space-y-4 pt-2">
                                          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                                                Materials & Care
                                          </h2>
                                          <div className="grid grid-cols-2 gap-4">
                                                {product.materials.map((item, index) => (
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
                              </div>
                        </div>
                  </div>

                  {/* Custom Modal for Notifications (To replace alert) */}
                  <div
                        id="custom-modal"
                        className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                  >
                        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full space-y-4">
                              <h3 className="text-xl font-bold text-black flex items-center">
                                    <IconShoppingBag size={24} className="mr-2" /> Notification
                              </h3>
                              <p id="modal-message" className="text-gray-700"></p>
                              <Button
                                    variant="default"
                                    className="w-full"
                                    onClick={() => document.getElementById("custom-modal")?.classList.add("hidden")}
                              >
                                    Got It
                              </Button>
                        </div>
                  </div>
            </div>
      );
};

const App: React.FC = () => {
      // The main App component simply renders the detail page for the single mock product.
      return <ProductDetailPage product={MOCK_PRODUCT_SINGLE} />;
};

export default App;

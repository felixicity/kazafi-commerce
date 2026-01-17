"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { SingleProduct } from "@/lib/types";
import { fetchSingleProduct } from "@/lib/mutations/product";
import { SingleProductPage } from "./single-product";

const SingleProductRoute: React.FC<{ product: SingleProduct }> = () => {
      const [selectedColor, setSelectedColor] = useState<string>("");
      const [selectedSize, setSelectedSize] = useState<string>("M");
      const [quantity, setQuantity] = useState<number>(1);
      const params = useParams();
      const productId = params.id as string; // Ensure this matches your [productId] folder name

      // Make a query to the dtb to get the product details based on productId
      const {
            data: product,
            isLoading,
            isError,
            error,
      } = useQuery({
            queryKey: ["product", productId],
            queryFn: () => fetchSingleProduct(productId),
            enabled: !!productId, // Only run if ID exists
      });

      console.log("Fetched product data:", product);

      useEffect(() => {
            if (product && product.variations && product.variations.length > 0) {
                  setTimeout(() => setSelectedColor(product.variations[0].color), 0);
            }
      }, [product]);

      if (isError) {
            console.error("Error fetching product:", error);
            return (
                  <div className="min-h-screen flex items-center justify-center">
                        <p className="text-red-500">Error fetching product details. Please try again later.</p>
                  </div>
            );
      }

      if (isLoading) {
            return (
                  <div className="min-h-screen flex items-center justify-center">
                        <p className="text-gray-500">Loading product details...</p>
                  </div>
            );
      }

      if (!product) {
            return (
                  <div className="min-h-screen flex items-center justify-center">
                        <p className="text-red-500">Product not found.</p>
                  </div>
            );
      }

      //   const priceClasses = product.variations[0].discount
      //         ? "text-2xl text-gray-500 line-through font-normal"
      //         : "text-3xl font-bold text-gray-900";
      //   const displayPrice = product.variations[0].discount
      //         ? `$${product.variations[0].price.toFixed(2)}`
      //         : `$${product.variations[0].price.toFixed(2)}`;
      //   const salePrice = product.variations[0].discount ? (
      //         <span className="text-3xl font-bold text-red-600 ml-4">${product.variations[0].price.toFixed(2)}</span>
      //   ) : null;

      return (
            <div className="min-h-screen sm:p-12">
                  <SingleProductPage
                        product={product}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        quantity={quantity}
                        setQuantity={setQuantity}
                  />
            </div>
      );
};

export default SingleProductRoute;

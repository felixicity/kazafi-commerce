"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Product } from "@/lib/types";
import { fetchSingleProduct } from "@/lib/mutations/product";
import { SingleProductPage } from "./single-product";

const SingleProductRoute: React.FC<{ product: Product }> = () => {
      const [selectedColor, setSelectedColor] = useState<string>("");
      const [selectedSize, setSelectedSize] = useState<string>("M");
      const [quantity, setQuantity] = useState<number>(1);
      const params = useParams();
      const productId = params.id as string;

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

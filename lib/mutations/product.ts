// src/productApi.ts
import { FilterState } from "@/hooks/useFilterManagement";
import { Product } from "../types"; // Import the defined type

// Use a *public* environment variable for client-side API calls
// Next.js convention requires NEXT_PUBLIC_ prefix for client-side use
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Custom Error class for API failures
 */
export class FetchError extends Error {
      status: number;
      constructor(message: string, status: number) {
            super(message);
            this.name = "FetchError";
            this.status = status;
      }
}

/*
 * Fetch function for retrieving all products.
 * @returns A promise that resolves to an array of Products.
 */
export const fetchProducts = async (params: FilterState): Promise<Product[]> => {
      const queryString = new URLSearchParams(
            Object.entries(params).map(([key, value]) => [key, String(value)]),
      ).toString();

      const response = await fetch(`${BASE_URL}/products?${queryString}`);

      if (!response.ok) {
            // Throw a custom error with the status code
            const errorDetail = await response.text();
            throw new FetchError(`Failed to fetch products (${response.status}): ${errorDetail}`, response.status);
      }

      // Explicitly cast the result to the desired type
      const products: Product[] = await response.json();

      return products;
};

/*
 * Fetch function for retrieving a single product.
 * @returns A promise that resolves to a single Product.
 */
export const fetchSingleProduct = async (productId: string) => {
      const response = await fetch(`${BASE_URL}/products/${productId}`);

      if (!response.ok) {
            // Throw a custom error with the status code
            const errorDetail = await response.text();
            throw new FetchError(`Failed to fetch product (${response.status}): ${errorDetail}`, response.status);
      }

      // Explicitly cast the result to the desired type
      const data = await response.json();
      console.log("Fetched product:", data);

      return data;
};

export const fetchAllProducts = async () => {
      console.log("Fetching all products from:", `${BASE_URL}/products/admin`);

      const response = await fetch(`${BASE_URL}/products/admin`, {
            credentials: "include",
      });

      if (!response.ok) {
            // Throw a custom error with the status code
            const errorDetail = await response.text();
            throw new FetchError(`Failed to fetch products (${response.status}): ${errorDetail}`, response.status);
      }

      // Explicitly cast the result to the desired type
      const data = await response.json();
      console.log("Fetched products:", data);

      return data;
};

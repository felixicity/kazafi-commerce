// src/api/productApi.ts
import { Product } from "../types"; // Import the defined type
import { ProductParams } from "../types";

// Use a *public* environment variable for client-side API calls
// Next.js convention requires NEXT_PUBLIC_ prefix for client-side use
const BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_API_URL || "http://localhost:5000";

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

/**
 * Fetch function for retrieving all products.
 * @returns A promise that resolves to an array of Products.
 */
export const fetchProducts = async (params: ProductParams): Promise<Product[]> => {
      const queryString = new URLSearchParams(params as Record<string, string>).toString();

      const response = await fetch(`${BASE_URL}/api/products?${queryString}`);

      if (!response.ok) {
            // Throw a custom error with the status code
            const errorDetail = await response.text();
            throw new FetchError(`Failed to fetch products (${response.status}): ${errorDetail}`, response.status);
      }

      // Explicitly cast the result to the desired type
      const products: Product[] = await response.json();

      return products;
};

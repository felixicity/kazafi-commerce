// src/hooks/useFilterOptions.ts
import { useQuery } from "@tanstack/react-query";
import { ProductColor, ProductSize } from "@/lib/types"; // Assuming these types exist

export interface FilterOptions {
      categories: string[];
      colors: ProductColor[]; // Keep the color object for rendering (name/hex)
      sizes: ProductSize[];
      maxPrice: number;
}

// NOTE: This fetcher should be implemented on your backend to return just the unique options
const fetchFilterOptions = async (): Promise<FilterOptions> => {
      const API_URL = process.env.NEXT_PUBLIC_EXPRESS_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/products/options`);

      if (!res.ok) {
            throw new Error("Failed to fetch filter options.");
      }
      return res.json();
};

export const useFilterOptions = () => {
      return useQuery({
            queryKey: ["filterOptions"],
            queryFn: fetchFilterOptions,
            staleTime: Infinity, // Filter options don't change often
      });
};

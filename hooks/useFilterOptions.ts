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
      return Promise.resolve({
            categories: ["tables", "chairs", "sofas", "artworks", "wardrobes", "consoles"],
            colors: [
                  { name: "blue", hex: "#eee" },
                  { name: "grey", hex: "#ccc" },
                  { name: "white", hex: "#fff" },
                  { name: "black", hex: "#000" },
            ],
            sizes: ["XS", "SM", "M", "L", "XL", "XXL"],
            maxPrice: 150,
      });
};

export const useFilterOptions = () => {
      return useQuery({
            queryKey: ["filterOptions"],
            queryFn: fetchFilterOptions,
            staleTime: Infinity, // Filter options don't change often
      });
};

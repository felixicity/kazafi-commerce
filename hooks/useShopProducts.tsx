import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/mutations/product";
import { FilterState } from "./useFilterManagement";
import { Product } from "@/lib/types";

// Custom hook to manage the view state and fetch
export const useShopProducts = (params: FilterState) => {
      // TanStack Query will automatically refetch whenever 'params' changes!
      return useQuery<Product[]>({
            queryKey: ["products", params],
            queryFn: () => fetchProducts(params), // Pass parameters to the fetcher
      });
};

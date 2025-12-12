import { useQuery } from "@tanstack/react-query";
import { ProductParams } from "@/lib/types";
import { fetchProducts } from "@/lib/mutations/product";
import { FilterState } from "./useFilterManagement";

// Custom hook to manage the view state and fetch
export const useShopProducts = (params: FilterState) => {
      // TanStack Query will automatically refetch whenever 'params' changes!
      return useQuery({
            queryKey: ["products", params],
            queryFn: () => fetchProducts(params), // Pass parameters to the fetcher
      });
};

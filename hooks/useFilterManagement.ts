import { useState } from "react";

export interface FilterState {
      category: string[];
      color: string[];
      size: string[];
      priceRange: [number, number];
      search: string;
}

// 1. Create a Type for keys that specifically point to string arrays
export type ArrayFilterKey = "category" | "color" | "size";

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

export const useFilterManagement = (
      initialState: FilterState = {
            category: [],
            color: [],
            size: [],
            priceRange: [MIN_PRICE, MAX_PRICE],
            search: "",
      },
) => {
      const [filters, setFilters] = useState<FilterState>(initialState);

      const handlePriceChange = (value: [number, number]) => {
            setFilters((prev) => ({ ...prev, priceRange: value }));
      };

      // 2. Restrict the 'key' argument to ArrayFilterKey
      const handleToggleFilter = (key: ArrayFilterKey, value: string, isChecked: boolean) => {
            setFilters((prev) => {
                  // Now TypeScript knows for certain that prev[key] is a string[]
                  const currentValues = prev[key];

                  return {
                        ...prev,
                        [key]: isChecked ? [...currentValues, value] : currentValues.filter((v) => v !== value),
                  };
            });
      };

      const handleSearchChange = (value: string) => {
            setFilters((prev) => ({ ...prev, search: value }));
      };

      const clearFilters = () => setFilters(initialState);

      return {
            filters,
            queryParams: filters,
            handleToggleFilter,
            handlePriceChange,
            handleSearchChange,
            clearFilters,
            MAX_PRICE,
            MIN_PRICE,
            setParams: setFilters,
      };
};

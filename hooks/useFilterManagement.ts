// src/hooks/useFilterManagement.ts
import { useState } from "react";

// Define the shape of your query parameters
export interface FilterState {
      category: string[];
      color: string[]; // Use hex code string for simplicity
      size: string[];
      priceRange: [number, number];
      search: string;
}

const MIN_PRICE = 2500;
const MAX_PRICE = 300000; // Should be dynamic, but fixed for the example

export const useFilterManagement = (
      initialState: FilterState = {
            category: [],
            color: [],
            size: [],
            priceRange: [MIN_PRICE, MAX_PRICE],
            search: "",
      }
) => {
      const [filters, setFilters] = useState<FilterState>(initialState);

      // Handler for Price Slider (simpler)
      const handlePriceChange = (value: [number, number]) => {
            setFilters((prev) => ({ ...prev, priceRange: value }));
      };

      // Handler for Checkboxes (Category/Size/Color)
      const handleToggleFilter = (key: keyof FilterState, value: string, isChecked: boolean) => {
            setFilters((prev) => {
                  const currentValues = prev[key] as string[];
                  return {
                        ...prev,
                        [key]: isChecked ? [...currentValues, value] : currentValues.filter((v) => v !== value),
                  };
            });
      };

      const clearFilters = () => {
            setFilters(initialState);
      };

      // This object contains the current filters that should be passed to useShopProducts
      const queryParams = filters;
      const setParams = setFilters;

      return {
            filters,
            queryParams,
            handleToggleFilter,
            handlePriceChange,
            clearFilters,
            MAX_PRICE,
            MIN_PRICE,
            setParams,
      };
};

import React from "react";
import { useFilterOptions } from "../../hooks/useFilterOptions";
import { IconFilterDiscount, IconLoader } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { PriceSlider } from "@/components/features/client/price-slider";
import { FilterState } from "@/hooks/useFilterManagement"; // Ensure this is correctly imported

interface FiltersSidebarProps {
      filters: FilterState; // Current filter state
      MAX_PRICE: number;
      MIN_PRICE: number;
      handleToggleFilter: (key: keyof FilterState, value: string, isChecked: boolean) => void;
      handlePriceChange: (value: [number, number]) => void;
      clearFilters: () => void;
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
      filters,
      MAX_PRICE,
      MIN_PRICE,
      handleToggleFilter,
      handlePriceChange,
      clearFilters,
}) => {
      // 1. Fetch available options
      const { data: options, isLoading, isError } = useFilterOptions();

      if (isLoading) {
            return (
                  <div className="flex justify-center items-center h-full min-h-64">
                        <IconLoader className="h-6 w-6 animate-spin text-gray-500" />
                  </div>
            );
      }

      if (isError || !options) {
            return <div className="text-sm text-red-500">Error loading filters.</div>;
      }

      const { categories, colors, sizes } = options;

      // Helper to check if a filter value is currently active
      const isActive = (key: keyof FilterState, value: string) => filters[key].includes(value);

      return (
            <div className="py-2 space-y-5 lg:sticky lg:top-4 bg-white lg:bg-transparent h-dvh overflow-y-auto">
                  <div className="flex justify-between items-center pb-2 border-b lg:border-none">
                        <h2 className="text-lg flex items-center gap-2">
                              <IconFilterDiscount size={20} />
                              Filters
                        </h2>
                        <Button variant="ghost" className="text-sm text-gray-500" onClick={clearFilters}>
                              Clear All
                        </Button>
                  </div>

                  {/* CATEGORY Filter */}
                  <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-800 uppercase">Category</h3>
                        {categories.map((category) => (
                              <div key={category} className="flex items-center space-x-3">
                                    <Checkbox
                                          id={`cat-${category}`}
                                          checked={isActive("category", category)}
                                          // Call the handler provided by the parent hook
                                          onCheckedChange={(checked: boolean) =>
                                                handleToggleFilter("category", category, checked)
                                          }
                                    />
                                    <Label htmlFor={`cat-${category}`}>{category}</Label>
                              </div>
                        ))}
                  </div>

                  <Separator />

                  {/* PRICE RANGE Filter */}
                  <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-800 uppercase">Price Range</h3>
                        <div className="flex justify-between text-sm font-semibold text-gray-900">
                              <span>
                                    {new Intl.NumberFormat("en-NG", {
                                          style: "currency",
                                          currency: "NGN",
                                    }).format(filters.priceRange[0])}
                              </span>
                              <span>
                                    {new Intl.NumberFormat("en-NG", {
                                          style: "currency",
                                          currency: "NGN",
                                    }).format(filters.priceRange[1])}
                              </span>
                        </div>
                        {/* Ensure PriceSlider handles two values [min, max] */}
                        <PriceSlider
                              value={filters.priceRange}
                              onValueChange={handlePriceChange} // Call the unified price handler
                              min={MIN_PRICE}
                              max={MAX_PRICE}
                        />
                  </div>

                  <Separator />

                  {/* COLOR Filter */}
                  <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-800 uppercase">Color</h3>
                        <div className="flex flex-wrap gap-3">
                              {colors.map((color) => (
                                    <div
                                          key={color.hex}
                                          onClick={() =>
                                                handleToggleFilter("color", color.hex, !isActive("color", color.hex))
                                          }
                                          style={{
                                                backgroundColor: color.hex,
                                                borderColor: color.hex === "#FFFFFF" ? "#e5e7eb" : "transparent",
                                          }}
                                          className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-all ${
                                                isActive("color", color.hex)
                                                      ? "ring-2 ring-offset-2 ring-black"
                                                      : "hover:ring-1 ring-gray-400"
                                          }`}
                                          title={color.name}
                                    />
                              ))}
                        </div>
                  </div>

                  <Separator />

                  {/* SIZE Filter */}
                  <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-800 uppercase">Size</h3>
                        <div className="flex flex-wrap gap-2">
                              {sizes.map((size) => (
                                    <Button
                                          key={size}
                                          variant={isActive("size", size) ? "default" : "outline"}
                                          className={`h-8 px-4 text-xs ${
                                                isActive("size", size)
                                                      ? "bg-black text-white"
                                                      : "bg-white hover:bg-gray-100"
                                          }`}
                                          onClick={() => handleToggleFilter("size", size, !isActive("size", size))}
                                    >
                                          {size.toUpperCase()}
                                    </Button>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

import { FilterState, Product, ProductSize, ProductColor } from "@/lib/types";
import { Button } from "../ui/button";
import { IconFilter, IconFilter2, IconFilter2Cog, IconFilter2Down, IconFilterDiscount } from "@tabler/icons-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { PriceSlider } from "@/components/features/client/price-slider";

const MIN_PRICE = 0;
const MAX_PRICE = 150;

export const FiltersSidebar: React.FC<{
      filters: FilterState;
      setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
      allProducts: Product[];
}> = ({ filters, setFilters, allProducts }) => {
      const handleCheckboxChange = (key: keyof FilterState, value: string | ProductSize, isChecked: boolean) => {
            setFilters((prev) => {
                  const currentValues = prev[key] as (string | ProductSize)[];
                  return {
                        ...prev,
                        [key]: isChecked ? [...currentValues, value] : currentValues.filter((v) => v !== value),
                  };
            });
      };

      const clearFilters = () => {
            setFilters({
                  category: [],
                  color: [],
                  size: [],
                  priceRange: [MIN_PRICE, MAX_PRICE],
            });
      };

      const getUniqueValues = (key: keyof Product["variants"]) => {
            const values = allProducts.flatMap((p) => p.variants[key]);
            if (key === "color") {
                  const colorMap = new Map<string, ProductColor>();
                  (values as ProductColor[]).forEach((c) => colorMap.set(c.hex, c));
                  return Array.from(colorMap.values());
            }
            return Array.from(new Set(values));
      };

      const uniqueCategories = Array.from(new Set(allProducts.map((p) => p.category)));
      const uniqueColors = getUniqueValues("color") as ProductColor[];
      const uniqueSizes = getUniqueValues("sizes") as ProductSize[];

      return (
            <div className="py-2 space-y-5 lg:sticky lg:top-4 bg-white lg:bg-transparent h-dvh overflow-y-auto">
                  <div className="flex justify-between items-center pb-2 border-b lg:border-none">
                        <h2 className="text-lg flex items-center gap-2">
                              <IconFilterDiscount size={20} />
                              Product Filters
                        </h2>
                        <div className="flex items-center gap-2">
                              <Button variant="ghost" className="text-sm text-gray-500" onClick={clearFilters}>
                                    Clear All
                              </Button>
                        </div>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-800 uppercase">Category</h3>
                        {uniqueCategories.map((category) => (
                              <div key={category} className="flex items-center space-x-3">
                                    <Checkbox
                                          id={`cat-${category}`}
                                          checked={filters.category.includes(category)}
                                          onCheckedChange={(checked: boolean) =>
                                                handleCheckboxChange("category", category, checked)
                                          }
                                    />
                                    <Label htmlFor={`cat-${category}`}>{category}</Label>
                              </div>
                        ))}
                  </div>

                  <Separator />

                  {/* Price Range Filter (Using PriceSlider Mock) */}
                  <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-800 uppercase">Price Range</h3>
                        <div className="flex justify-between text-sm font-semibold text-gray-900">
                              <span>${filters.priceRange[0].toFixed(2)}</span>
                              <span>${filters.priceRange[1].toFixed(2)}</span>
                        </div>
                        {/* Note: The mock only controls the minimum price for simplicity */}
                        <PriceSlider
                              value={filters.priceRange}
                              onValueChange={(val: [number]) =>
                                    setFilters((prev) => ({ ...prev, priceRange: [val[0], MAX_PRICE] }))
                              }
                              min={MIN_PRICE}
                              max={MAX_PRICE}
                        />
                        <p className="text-xs text-gray-500">Filtering from ${filters.priceRange[0].toFixed(2)}</p>
                  </div>

                  <Separator />

                  {/* Color Filter */}
                  <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-800 uppercase">Color</h3>
                        <div className="flex flex-wrap gap-3">
                              {uniqueColors.map((color) => (
                                    <div
                                          key={color.hex}
                                          onClick={() =>
                                                handleCheckboxChange(
                                                      "color",
                                                      color.hex,
                                                      !filters.color.includes(color.hex)
                                                )
                                          }
                                          style={{
                                                backgroundColor: color.hex,
                                                borderColor: color.hex === "#FFFFFF" ? "#e5e7eb" : "transparent",
                                          }}
                                          className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-all ${
                                                filters.color.includes(color.hex)
                                                      ? "ring-2 ring-offset-2 ring-black"
                                                      : "hover:ring-1 ring-gray-400"
                                          }`}
                                          title={color.name}
                                    />
                              ))}
                        </div>
                  </div>

                  <Separator />

                  {/* Size Filter */}
                  <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-800 uppercase">Size</h3>
                        <div className="flex flex-wrap gap-2">
                              {uniqueSizes.map((size) => (
                                    <Button
                                          key={size}
                                          variant={filters.size.includes(size) ? "default" : "outline"}
                                          className={`h-8 px-4 text-xs ${
                                                filters.size.includes(size)
                                                      ? "bg-black text-white"
                                                      : "bg-white hover:bg-gray-100"
                                          }`}
                                          onClick={() =>
                                                handleCheckboxChange("size", size, !filters.size.includes(size))
                                          }
                                    >
                                          {size}
                                    </Button>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

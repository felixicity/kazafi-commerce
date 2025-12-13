"use client";

import React, { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { useFilterManagement } from "@/hooks/useFilterManagement"; // The hook you created earlier (accepts queryParams)
import { FiltersSidebar } from "@/components/features/filter-sidebar";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { IconSearch, IconLayoutGrid, IconList } from "@tabler/icons-react";
import { useShopProducts } from "@/hooks/useShopProducts";
import { ViewMode } from "@/lib/types";
import { ShopProducts } from "./product/shop-products";

// --- Main Component ---

const ProductListingPage: React.FC = () => {
      // 1. Instant state for the input field
      const [searchInput, setSearchInput] = useState("");

      const [viewMode, setViewMode] = useState<ViewMode>("grid");

      const {
            filters,
            queryParams,
            handleToggleFilter,
            handlePriceChange,
            clearFilters,
            MAX_PRICE,
            MIN_PRICE,
            setParams,
      } = useFilterManagement();

      // 2. Debounced state for the query hook (waits 300ms)
      const debouncedSearch = useDebounce(searchInput, 300);

      const { data, isLoading, isError, error } = useShopProducts(queryParams);

      // --- Use this in your useFilterManagement/useShopProducts integration ---
      useEffect(() => {
            // Update the central filter state only when the debounced value changes
            setParams((prev) => ({
                  ...prev,
                  search: debouncedSearch.trim(),
            }));
      }, [debouncedSearch, setParams]);

      return (
            <div className="min-h-screen">
                  {/* Header and Search Bar */}
                  <header className="bg-white shadow-md p-4 sticky top-0 z-10 border-b border-gray-100">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                              <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                                    {searchInput !== "" ? `Results for "${searchInput}"` : "All Products"}
                              </h1>
                              <div className="relative w-full md:w-96">
                                    <InputGroup>
                                          <InputGroupInput
                                                placeholder="Search products..."
                                                value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                className="pl-10 h-11"
                                          />
                                          <InputGroupAddon>
                                                <IconSearch />
                                          </InputGroupAddon>
                                    </InputGroup>
                              </div>
                        </div>
                  </header>

                  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4 py-8">
                        {/* Mobile Filter Button & Sort */}
                        <div className="flex justify-between items-center mb-6 lg:hidden">
                              {/* Mobile Filters Sheet (Uses Refined Sheet Mock) */}
                              <Sheet>
                                    <SheetTrigger asChild>
                                          <Button
                                                variant="outline"
                                                className="flex items-center gap-2 border-2 text-black font-semibold hover:bg-gray-100"
                                          >
                                                <SlidersHorizontal size={16} />
                                                Filters
                                          </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                          <div className="flex flex-col h-full">
                                                {/* Sheet Header & Filters Content */}
                                                <div className="grow overflow-y-auto">
                                                      <div className="p-4 sticky top-0">
                                                            <FiltersSidebar
                                                                  filters={filters}
                                                                  MIN_PRICE={MIN_PRICE}
                                                                  MAX_PRICE={MAX_PRICE}
                                                                  handleToggleFilter={handleToggleFilter}
                                                                  handlePriceChange={handlePriceChange}
                                                                  clearFilters={clearFilters}
                                                            />
                                                      </div>
                                                </div>
                                                {/* Fixed Footer */}
                                                <SheetClose>
                                                      <div className="p-4 shrink-0 mt-auto border-t shadow-md">
                                                            <Button
                                                                  variant="default"
                                                                  className="w-full font-bold py-3 h-auto"
                                                            >
                                                                  Show {data?.length} Results
                                                            </Button>
                                                      </div>
                                                </SheetClose>
                                                {/* <SortDropdown sort={} setSort={setParams} /> */}
                                          </div>
                                    </SheetContent>
                              </Sheet>
                        </div>

                        {/* Desktop Filter Bar and Controls */}
                        <div className="hidden lg:flex justify-between items-center border-b pb-2 mb-6">
                              <p className="text-base font-medium text-gray-700">
                                    Showing <span className="font-semibold">{data?.length}</span> results
                              </p>
                              <div className="flex items-center gap-4">
                                    {/* <SortDropdown sort={params.sort} setSort={setParams} /> */}
                                    <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                          <Button
                                                variant="ghost"
                                                size="icon"
                                                className={`h-10 w-10 ${
                                                      viewMode === "grid"
                                                            ? "bg-gray-200 text-black"
                                                            : "text-gray-500 hover:bg-gray-100"
                                                }`}
                                                onClick={() => setViewMode("grid")}
                                          >
                                                <IconLayoutGrid size={18} />
                                          </Button>
                                          <div className="h-10 w-px bg-gray-200" />
                                          <Button
                                                variant="ghost"
                                                size="icon"
                                                className={`h-10 w-10 ${
                                                      viewMode === "list"
                                                            ? "bg-gray-200 text-black"
                                                            : "text-gray-500 hover:bg-gray-100"
                                                }`}
                                                onClick={() => setViewMode("list")}
                                          >
                                                <IconList size={18} />
                                          </Button>
                                    </div>
                              </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                              {/* Left Column (Filters - Desktop) */}
                              <div className="hidden lg:block lg:col-span-1">
                                    <div className="w-full p-4 sticky top-0">
                                          <FiltersSidebar
                                                filters={filters}
                                                MIN_PRICE={MIN_PRICE}
                                                MAX_PRICE={MAX_PRICE}
                                                handleToggleFilter={handleToggleFilter}
                                                handlePriceChange={handlePriceChange}
                                                clearFilters={clearFilters}
                                          />
                                    </div>
                              </div>

                              {/* Right Column (Product Grid) */}
                              <ShopProducts
                                    data={data}
                                    isLoading={isLoading}
                                    isError={isError}
                                    viewMode={viewMode}
                                    error={error}
                              />
                        </div>
                  </div>
            </div>
      );
};

export default ProductListingPage;

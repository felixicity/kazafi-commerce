"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MOCK_PRODUCTS } from "@/lib/store/cart-store";
import { SlidersHorizontal } from "lucide-react";
import { FilterState, SortOption, ViewMode } from "@/lib/types";
import { ProductCard } from "@/components/features/client/product-card";
import { FiltersSidebar } from "@/components/features/filter-sidebar";
import { SortDropdown } from "@/components/features/sort-items";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { IconSearch, IconLayoutGrid, IconList } from "@tabler/icons-react";

const MIN_PRICE = 0;
const MAX_PRICE = 150;

// --- Main Component ---

const ProductListingPage: React.FC = () => {
      const [filters, setFilters] = useState<FilterState>({
            category: [],
            color: [],
            size: [],
            priceRange: [MIN_PRICE, MAX_PRICE],
      });
      const [sort, setSort] = useState<SortOption>("relevance");
      const [viewMode, setViewMode] = useState<ViewMode>("grid");
      const [searchQuery, setSearchQuery] = useState<string>("");

      // 1. Filtered Products
      const filteredProducts = useMemo(() => {
            return MOCK_PRODUCTS.filter((product) => {
                  // Search Filter
                  if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return false;
                  }

                  // Category Filter
                  if (filters.category.length > 0 && !filters.category.includes(product.category)) {
                        return false;
                  }

                  // Price Range Filter (using both min and max from state)
                  if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
                        return false;
                  }

                  // Color Filter
                  if (filters.color.length > 0) {
                        const productColors = product.variants.color.map((c) => c.hex);
                        if (!filters.color.some((hex) => productColors.includes(hex))) {
                              return false;
                        }
                  }

                  // Size Filter
                  if (filters.size.length > 0) {
                        if (!filters.size.some((size) => product.variants.sizes.includes(size))) {
                              return false;
                        }
                  }

                  return true;
            });
      }, [filters, searchQuery]);

      // 2. Sorted Products
      const sortedProducts = useMemo(() => {
            const products = [...filteredProducts];
            switch (sort) {
                  case "price-asc":
                        return products.sort((a, b) => a.price - b.price);
                  case "price-desc":
                        return products.sort((a, b) => b.price - a.price);
                  case "rating-desc":
                        return products.sort((a, b) => b.reviews.rating - a.reviews.rating);
                  case "relevance":
                  default:
                        return products;
            }
      }, [filteredProducts, sort]);

      const activeFilterCount = useMemo(() => {
            let count = filters.category.length + filters.color.length + filters.size.length;
            // Count price range filter if min is not 0 or max is not 150
            if (filters.priceRange[0] !== MIN_PRICE || filters.priceRange[1] !== MAX_PRICE) {
                  count += 1;
            }
            return count;
      }, [filters]);
      return (
            <div className="min-h-screen">
                  {/* Header and Search Bar */}
                  <header className="bg-white shadow-md p-4 sticky top-0 z-10 border-b border-gray-100">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                              <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                                    {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
                              </h1>
                              <div className="relative w-full md:w-96">
                                    <InputGroup>
                                          <InputGroupInput
                                                placeholder="Search products..."
                                                value={searchQuery}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                      setSearchQuery(e.target.value)
                                                }
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
                                                {activeFilterCount > 0 && (
                                                      <span className="ml-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                                            {activeFilterCount}
                                                      </span>
                                                )}
                                          </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                          <div className="flex flex-col h-full">
                                                {/* Sheet Header & Filters Content */}
                                                <div className="grow overflow-y-auto">
                                                      <FiltersSidebar
                                                            filters={filters}
                                                            setFilters={setFilters}
                                                            allProducts={MOCK_PRODUCTS}
                                                      />
                                                </div>
                                                {/* Fixed Footer */}
                                                <SheetClose>
                                                      <div className="p-4 shrink-0 mt-auto border-t shadow-md">
                                                            <Button
                                                                  variant="default"
                                                                  className="w-full font-bold py-3 h-auto"
                                                            >
                                                                  Show {sortedProducts.length} Results
                                                            </Button>
                                                      </div>
                                                </SheetClose>
                                                <SortDropdown sort={sort} setSort={setSort} />
                                          </div>
                                    </SheetContent>
                              </Sheet>
                        </div>

                        {/* Desktop Filter Bar and Controls */}
                        <div className="hidden lg:flex justify-between items-center border-b pb-2 mb-6">
                              <p className="text-base font-medium text-gray-700">
                                    Showing <span className="font-semibold">{sortedProducts.length}</span> results
                              </p>
                              <div className="flex items-center gap-4">
                                    <SortDropdown sort={sort} setSort={setSort} />
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
                                    <FiltersSidebar
                                          filters={filters}
                                          setFilters={setFilters}
                                          allProducts={MOCK_PRODUCTS}
                                    />
                              </div>

                              {/* Right Column (Product Grid) */}
                              <div className="lg:col-span-3">
                                    {sortedProducts.length === 0 ? (
                                          <div className="text-center py-20 bg-white rounded-xl shadow-inner border border-gray-100">
                                                <h2 className="text-2xl font-semibold text-gray-700">
                                                      No products found
                                                </h2>
                                                <p className="text-gray-500 mt-2">
                                                      Try adjusting your filters or search query.
                                                </p>
                                          </div>
                                    ) : (
                                          <div
                                                className={
                                                      viewMode === "grid"
                                                            ? "grid grid-cols-2 md:grid-cols-3 gap-6"
                                                            : "grid grid-cols-1 gap-6"
                                                }
                                          >
                                                {sortedProducts.map((product) => (
                                                      <ProductCard
                                                            key={product.id}
                                                            product={product}
                                                            viewMode={viewMode}
                                                      />
                                                ))}
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default ProductListingPage;

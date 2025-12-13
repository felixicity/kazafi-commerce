import { ProductCard } from "@/components/features/client/product-card";
import { IconLoader, IconAlertTriangle } from "@tabler/icons-react";

export function ShopProducts({ data, isLoading, isError, viewMode }) {
      // 1. Loading State
      if (isLoading) {
            return (
                  <div className="flex justify-center items-center h-96">
                        <IconLoader className="animate-spin h-6 w-6 mr-2" />
                        <p>Loading products...</p>
                  </div>
            );
      }

      // 2. Error State
      if (isError) {
            return (
                  <div className="flex flex-col items-center justify-center h-96 text-red-600">
                        <IconAlertTriangle className="h-10 w-10 mb-2" />
                        <p className="font-bold">Error loading shop data.</p>
                        {/* Display status code from custom error */}
                        <p className="text-sm">{(error as any).message || "An unknown error occurred."}</p>
                  </div>
            );
      }

      return (
            <div className="lg:col-span-3">
                  {data?.products.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl shadow-inner border border-gray-100">
                              <h2 className="text-2xl font-semibold text-gray-700">No products found</h2>
                              <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
                        </div>
                  ) : (
                        <div
                              className={
                                    viewMode === "grid"
                                          ? "grid grid-cols-2 md:grid-cols-3 gap-6"
                                          : "grid grid-cols-1 gap-6"
                              }
                        >
                              {data?.products?.map((product) => (
                                    <ProductCard
                                          key={product.variations[0]._id}
                                          product={product}
                                          viewMode={viewMode}
                                    />
                              ))}
                        </div>
                  )}
            </div>
      );
}

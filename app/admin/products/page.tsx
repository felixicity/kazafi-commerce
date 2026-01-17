"use client";
import dynamic from "next/dynamic";
import { fetchAllProducts } from "@/lib/mutations/product";
import { useQuery } from "@tanstack/react-query";

// import ProductsTable from "@/components/features/admin/products/products-table";

// We import the table component here with SSR disabled
const ProductsTable = dynamic(() => import("@/components/features/admin/products/products-table"), {
      ssr: false,
      loading: () => <p>Loading Table...</p>, // Optional: shows while the JS loads
});

export default function AdminProductPage() {
      const {
            data: productsData,
            error,
            isLoading,
      } = useQuery({
            queryKey: ["products"],
            queryFn: fetchAllProducts,
      });

      return (
            <div className="px-6 py-4">
                  <h1 className="font-semibold text-xl mb-4">Products</h1>

                  <section>
                        <ProductsTable initialData={productsData} />
                  </section>
            </div>
      );
}

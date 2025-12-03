import { ProductsTable } from "@/components/features/admin/products/products-table";
import { products } from "@/lib/store/cart-store";

export default function AdminProduct() {
      return (
            <div className="px-6 py-4">
                  <h1 className="font-semibold text-xl">Products</h1>
                  <section>
                        <ProductsTable data={products} />
                  </section>
            </div>
      );
}

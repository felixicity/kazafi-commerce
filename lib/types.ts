// =================================================================
// TYPES & DATA (UNCHANGED)
// =================================================================

/* For Products Listing Page*/
export type ProductColor = { name: string; hex: string };
export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type ProductReview = { rating: number; count: number };
export type MaterialItem = { title: string; detail: string };

export interface Product {
      id: number;
      name: string;
      category: string;
      price: number;
      originalPrice?: number;
      description: string;
      imagePlaceholder: string;
      variants: {
            color: ProductColor[];
            sizes: ProductSize[];
      };
      reviews: ProductReview;
}

export interface SingleProduct {
      id: number;
      name: string;
      category: string;
      description: string;
      details: string;
      variations: {
            color: ProductColor;
            sizes?: ProductSize[];
            stock: number;
            price: number;
            discount?: number;
            imageURLs: [string];
      }[];
      reviews: ProductReview;
      materials: MaterialItem[];
}

export interface FilterState {
      category: string[];
      color: string[];
      size: ProductSize[];
      priceRange: [number, number]; // [min, max]
}

export type SortOption = "relevance" | "price-asc" | "price-desc" | "rating-desc";
export type ViewMode = "grid" | "list";

export type DashboardSection = "overview" | "orders" | "settings" | "coupons";
export type SettingSubSection = "profile" | "billing";

export interface Order {
      id: string;
      date: string;
      status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
      total: number;
      items: number;
}

export interface Coupon {
      code: string;
      discount: string;
      expiry: string;
      valid: boolean;
}

// =================================================================
// TYPES & DATA (CART)
// =================================================================

// types.ts
export interface CartVariation {
      price: number;
      color?: string;
      quantity?: number; // Stock level, maybe
      hexCode?: string;
      imageURLs?: string[];
      stock?: number;
      _id: string; // The ID of the variation
}

export interface CartProduct {
      name: string;
      // Add other relevant product fields here
}

export interface CartItem {
      _id: string; // Add the item's unique ID for updates/deletion
      product: CartProduct;
      quantity: number;
      variation: CartVariation;
}

export interface CartData {
      cart: {
            _id: string;
            items: CartItem[];
            // Add other cart fields like userId, createdAt, etc.
      };
}

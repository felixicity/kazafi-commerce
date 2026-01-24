// =================================================================
// TYPES & DATA (UNCHANGED)
// =================================================================

/* For Products Listing Page*/
export type ProductColor = { name: string; hex: string };
export type ProductSize = "XS" | "SM" | "M" | "L" | "XL" | "XXL";
export type ProductReview = { rating: number; count: number };
export type MaterialItem = { title: string; detail: string };

export interface Product {
      _id: string;
      name: string;
      category: string;
      description: string;
      variations: Variant[];
      reviews?: ProductReview;
      materials?: MaterialItem[];
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
export interface Variant {
      _id: number;
      color?: string;
      hexCode?: string;
      sizes?: ProductSize[];
      discount?: number;
      price?: number;
      stock?: number;
      imageURLs?: string[] | string;
}

export interface CartProduct {
      name: string;
      // Add other relevant product fields here
}

export interface CartItem {
      _id: string; // Add the item's unique ID for updates/deletion
      product: Product;
      variation: Variant;
      quantity: number;
}

export interface CartData {
      cart: {
            _id: string;
            items: CartItem[];
            // Add other cart fields like userId, createdAt, etc.
      };
}

// Define the parameters for filtering/sorting
export interface ProductParams {
      category?: string;
      sort?: "price_asc" | "price_desc" | "newest";
      search?: string;
}

export interface OrderProduct {
      _id: string;
      imageURLs: string[];
      // Add other fields if you use them, like name or price
}

export interface OrderItem {
      product: OrderProduct;
      color: string;
      // Common fields usually found here:
      size?: string;
      quantity?: number;
}

export interface CustomerOrder {
      _id: string;
      status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
      createdAt: string; // ISO Date string
      items: OrderItem[];
      totalQuantity: number;
      totalAmount: number;
      color?: string; // Used in your alt tag logic: order.color
}
export interface CartItemFromDB {
      _id: string;
      quantity: number;
      product: {
            name: string;
      };
      variation: Variant;
}

export interface OrderSummaryProps {
      cartItems: CartItemFromDB[];
      subtotal: string;
      total: number;
      shippingFee: number;
}

export interface Address {
      _id?: string;
      street?: string;
      city: string;
      country?: string;
      firstname?: string;
      lastname?: string;
      phone: string;
      postcode?: string;
      isDefault: boolean;
}

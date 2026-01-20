import { CartData, Variant } from "../types";

const CART_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

// --- Fetcher Function ---
export const fetchCartItems = async (): Promise<CartData> => {
      if (!CART_API_URL) {
            throw new Error("CART_API_URL is not defined");
      }
      const response = await fetch(CART_API_URL, {
            method: "GET",
            credentials: "include",
      });

      if (response.status === 401) {
            // You might throw an error here and handle it globally or in useQuery
            throw new Error("Authentication failed. Please log in.");
      }
      if (!response.ok) {
            throw new Error(`Failed to fetch cart items: ${response.statusText}`);
      }

      // TanStack Query expects a non-null return on success
      return (await response.json()) as CartData;
};

// --- Mutation Functions ---

// The mutation function for updating quantity
export const updateCartItemQuantity = async ({
      itemId,
      quantity,
}: {
      itemId: string;
      quantity: number;
}): Promise<void> => {
      // Example: PUT /api/cart/item/:itemId with new quantity

      // The actual API call would look something like this:
      const response = await fetch(`${CART_API_URL}/update/${itemId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
            throw new Error(`Failed to update cart item: ${response.statusText}`);
      }

      return response.json();
};

export const addItemToCart = async (item: { _id: string; variation: Variant; quantity: number }): Promise<void> => {
      const response = await fetch(`${CART_API_URL}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(item),
      });

      if (!response.ok) {
            throw new Error(`Failed to add item to cart: ${response.statusText}`);
      }

      return response.json();
};

export const removeCartItem = async (itemId: string): Promise<void> => {
      const response = await fetch(`${CART_API_URL}/remove/${itemId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
      });

      if (!response.ok) {
            throw new Error(`Failed to add item to cart: ${response.statusText}`);
      }
      return response.json();
};

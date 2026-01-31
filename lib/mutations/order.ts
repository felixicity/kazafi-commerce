import { Order } from "@/components/features/admin/orders/order-table-column";
import { OrderProduct } from "../types";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrder = async ({ address, shippingMethod }: { address: string; shippingMethod: string }) => {
      const response = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address, shippingMethod }),
            credentials: "include",
      });

      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to add address.");
      }

      return response.json();
};

export const getUserOrders = async () => {
      const response = await fetch(`${API_URL}/orders`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
      });
      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to fetch orders.");
      }
      return response.json();
};

export const getAllOrders = async () => {
      const response = await fetch(`${API_URL}/orders/admin/orders`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
      });
      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to fetch all orders.");
      }
      const data = await response.json();

      return data;
};

export const getSingleOrder = async (id: string) => {
      const response = await fetch(`${API_URL}/orders/${id}`, {
            method: "GET",
            credentials: "include",
      });
      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to fetch all orders.");
      }
      const data = await response.json();

      console.log(data);
      return data;
};

export const updateOrderStatus = async ({ orderId, status }: { orderId: string; status: string }) => {
      console.log(status);
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ status }),
      });
      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to update order status.");
      }
      const order = response.json();

      return order;
};

export const downloadOrderReceipt = async (orderId: string) => {
      const res = await fetch(`${API_URL}/orders/${orderId}/receipt`, {
            method: "GET",
            credentials: "include",
      });
      if (!res.ok) {
            const errorBody = await res.json();
            throw new Error(errorBody.message || "Failed to update order status.");
      }
};

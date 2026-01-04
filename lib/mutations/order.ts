const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const createOrder = async (address: string) => {
      const response = await fetch(`${API_URL}/api/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address }),
            credentials: "include",
      });

      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to add address.");
      }

      return response.json();
};

export const getUserOrders = async () => {
      const response = await fetch(`${API_URL}/api/orders`, {
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
      const response = await fetch(`${API_URL}/api/orders/admin/orders`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
      });
      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to fetch all orders.");
      }
      return response.json();
};

export const updateOrderStatus = async (orderId: string, status: string) => {
      const response = await fetch(`${API_URL}/api/admin/orders/${orderId}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ status }),
      });
      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to update order status.");
      }
      return response.json();
};

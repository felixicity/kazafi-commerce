const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const createPaymentIntent = async ({ orderId, provider }: { orderId: string; provider: string }) => {
      const response = await fetch(`${API_URL}/api/payment`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, provider }),
            credentials: "include",
      });

      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to add address.");
      }

      return response.json();
};

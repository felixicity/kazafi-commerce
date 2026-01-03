const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const createPaymentIntent = async ({ orderId, provider }: { orderId: string; provider: string }) => {
      const response = await fetch(`${API_URL}/api/payments/initiate`, {
            method: "POST",
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

// Function to check status
export async function checkPaymentStatus(reference: string) {
      try {
            const response = await fetch(`${API_URL}/api/payments/status/${reference}`, {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
            });
            const data = await response.json();

            console.log("Payment status data:", data);

            if (response.ok) {
                  return data;
            }
      } catch (error) {
            console.error("Error checking status:", error);
      }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getDiscountCode = async (code: string) => {
      const response = await fetch(`${API_URL}/api/discounts/apply`, {
            method: "POST",
            headers: {
                  "Content-Type": "application/json",
                  credentials: "include",
            },
            body: JSON.stringify({ code }),
      });
      return response.json();
};

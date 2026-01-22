const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getDiscountCode = async (code: string) => {
      const response = await fetch(`${API_URL}/discounts/apply`, {
            method: "POST",
            headers: {
                  "Content-Type": "application/json",
                  credentials: "include",
            },
            body: JSON.stringify({ code }),
      });
      return response.json();
};

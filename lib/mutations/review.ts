const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ReviewData {
      rating: number;
      comment: string;
      productId: string;
      orderId: string;
}

export const addProductReview = async ({ rating, comment, productId, orderId }: ReviewData) => {
      const response = await fetch(`${API_URL}/reviews/${productId}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rating, comment, orderId }),
            credentials: "include",
      });

      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to add review.");
      }

      const data = response.json();
      console.log(data);
      return data;
};

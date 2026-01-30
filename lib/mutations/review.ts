// import { ReviewData } from "../types";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const addProductReview = async ({
      formData,
      productId,
      orderId,
}: {
      formData: FormData;
      productId: string;
      orderId: string | undefined;
}) => {
      const response = await fetch(`${API_URL}/reviews/${orderId}/${productId}/add`, {
            method: "POST",
            body: formData,
            credentials: "include",
      });

      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to add review.");
      }

      const data = response.json();

      return data;
};

export const fetchProductReviews = async (productId: string) => {
      const response = await fetch(`${API_URL}/reviews/${productId}`, {
            method: "GET",
            credentials: "include",
      });
      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to add review.");
      }

      const data = response.json();

      return data;
};

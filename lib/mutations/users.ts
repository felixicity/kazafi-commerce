// Function to handle the POST request to your Express API
export const createLoginMutation = async (newLoginData: { email: string; password: string }) => {
      const API_URL = process.env.EXPRESS_API_INTERNAL_URL || "http://localhost:5000";

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await fetch(`${API_URL}/api/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newLoginData),
            credentials: "include",
      });

      if (!response.ok) {
            // If the server response is not successful, throw an error
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Login Failed after reaching the server.");
      }

      // Return the data returned by your Express API (e.g., the newly created product)
      return response.json();
};

export const createSignUpMutation = async (newSignUpData: { email: string; password: string }) => {
      const API_URL = process.env.EXPRESS_API_INTERNAL_URL || "http://localhost:5000";

      const response = await fetch(`${API_URL}/api/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSignUpData),
      });

      if (!response.ok) {
            // If the server response is not successful, throw an error
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Login Failed after reaching the server.");
      }

      // Return the data returned by your Express API (e.g., the newly created product)
      return response.json();
};

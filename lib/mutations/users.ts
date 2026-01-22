const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Function to handle the POST request to your Express API
export const createLoginMutation = async (newLoginData: { email: string; password: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newLoginData),
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
      const response = await fetch(`${API_URL}/users/register`, {
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

export const fetchUserDetails = async () => {
      const response = await fetch(`${API_URL}/users/profile`, {
            method: "GET",
            credentials: "include",
      });
      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to fetch user details.");
      }
      return response.json();
};

export const logoutUser = async () => {
      const response = await fetch(`${API_URL}/users/logout`, {
            method: "POST",
            credentials: "include",
      });
      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to logout user.");
      }
      return response.json();
};

export const addUserAddress = async (address: {
      firstname: string;
      lastname: string;
      phone: string;
      street: string;
      city: string;
      state: string;
      postcode: string;
      country: string;
}) => {
      const response = await fetch(`${API_URL}/users/addresses`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(address),
            credentials: "include",
      });

      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Failed to add address.");
      }

      return response.json();
};

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Function to handle the POST request to your Express API
export const createLoginMutation = async (newLoginData: { email: string; password: string }) => {
      const response = await fetch(`${API_URL}/users/login`, {
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

      const user = response.json();
      console.log("user", user);
      // Return the data returned by your Express API (e.g., the newly created product)
      return user;
};

export const createSignUpMutation = async (newSignUpData: { email: string; password: string }) => {
      const response = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSignUpData),
            credentials: "include",
      });

      if (!response.ok) {
            // If the server response is not successful, throw an error
            const errorBody = await response.json();
            throw new Error(errorBody.message || "Login Failed after reaching the server.");
      }

      return response.json();
      // Return the data returned by your Express API (e.g., the newly created user)
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

      console.log(response.json());
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

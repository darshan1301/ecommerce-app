import toast from "react-hot-toast";
import BASE_URL from "../BASE_URL";

export const loginService = async ({ email, password }) => {
  const url = `${BASE_URL}/user/login`;
  const body = JSON.stringify({ email, password });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      toast.error("failed to login");
      throw new Error("Failed to log in");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const signupService = async ({ fullName, email, password }) => {
  const url = `${BASE_URL}/user/signup`;
  const body = JSON.stringify({ fullName, email, password });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const res = await response.json();
      toast.error(res.message);
      throw new Error("Failed to sign up");
    }
    const data = await response.json();
    return data; // Return user data or token
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const getUserInfoService = async () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${BASE_URL}/user/me`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }
    const userData = await response.json();
    return userData; // Return user data
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw error;
  }
};

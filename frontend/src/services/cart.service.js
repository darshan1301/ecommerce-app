import BASE_URL from "../BASE_URL";

export const getCartService = async () => {
  const authToken = localStorage.getItem("authToken");
  const url = `${BASE_URL}/cart`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`, // Include the authentication token
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }
    const cartData = await response.json();
    // console.log(cartData);
    return cartData; // Return cart data
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const addToCartService = async (productId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${BASE_URL}/cart/addToCart`;
  const body = JSON.stringify({ productId, quantity: 1 });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`, // Include the authentication token
    },
    body: body,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to add product to cart");
    }
    const addedProduct = await response.json();
    return addedProduct; // Return the added product data
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const updateCartService = async (productId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${BASE_URL}/cart/${productId}`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to update cart");
    }
    const updatedCart = await response.json();
    return updatedCart; // Return the updated cart data
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
};

export const removeFromCartService = async (productId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${BASE_URL}/cart/${productId}`;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to remove product from cart");
    }
    const updatedCart = await response.json();
    return updatedCart; // Return the updated cart data
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};

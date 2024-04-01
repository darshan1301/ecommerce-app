import BASE_URL from "../BASE_URL";

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${BASE_URL}/products/${productId}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const editProduct = async (productId, updatedProduct) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${BASE_URL}/products/${productId}`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(updatedProduct),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to edit product");
    }
    return await response.json();
  } catch (error) {
    console.error("Error editing product:", error);
    throw error;
  }
};

export const addProduct = async (newProduct) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${BASE_URL}/products`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(newProduct),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    return await response.json(); // Return the newly added product data
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

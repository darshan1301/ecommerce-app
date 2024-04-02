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

export const deleteProductService = async (productId) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${BASE_URL}/admin/${productId}`;
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

export const editProductService = async (productId, updatedProduct) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${BASE_URL}/admin/${productId}`;
  // const formData = new FormData();

  // Object.entries(updatedProduct).forEach(([key, value]) => {
  //   if (key === "image") {
  //     formData.append(key, value[0]);
  //   } else {
  //     formData.append(key, value);
  //   }
  // });

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: updatedProduct,
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

export const addProductService = async (newProduct) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${BASE_URL}/admin/addProduct`;
  // const formData = new FormData();

  // Object.entries(newProduct).forEach(([key, value]) => {
  //   if (key === "image") {
  //     formData.append(key, value[0]);
  //   } else {
  //     formData.append(key, value);
  //   }
  // });

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: newProduct,
    // formData,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

import BASE_URL from "../BASE_URL";

export const getAllOrdersService = async () => {
  const authToken = localStorage.getItem("authToken");
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Include the authToken in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const makePaymentService = async (body) => {
  const authToken = localStorage.getItem("authToken");
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Include the authToken in the Authorization header
      },
      body: JSON.stringify(body),
    });
    const payment = await response.json();
    return payment;
  } catch (error) {
    console.error("Error fetching payments data:", error);
    throw error;
  }
};

// export const createOrderService = async (cartId, sessionId) => {
//   try {
//     const authToken = localStorage.getItem("authToken");
//     const url = "/api/orders"; // Update with your API endpoint
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${authToken}`,
//       },
//       body: JSON.stringify({
//         cartId,
//         sessionId,
//       }),
//     };

//     const response = await fetch(url, options);
//     if (!response.ok) {
//       throw new Error("Failed to create order");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error creating order:", error);
//     throw error;
//   }
// };

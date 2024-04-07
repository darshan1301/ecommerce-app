/* eslint-disable react/prop-types */
import React from "react";

const OrderCard = ({ order }) => {
  // console.log(order);
  return (
    <div className="mb-4 rounded-md border border-gray-200 p-4">
      <h2 className="mb-2 text-lg font-semibold">Order Details</h2>
      <p>
        <strong>Order ID:</strong> {order._id}
      </p>
      <p>
        <strong>User:</strong> {order.user.email}
      </p>
      <p>
        <strong>Total:</strong> ${order.total / 100}
      </p>
      <p>
        <strong>Address:</strong> {order.address}
      </p>
      <p>
        <strong>Created:</strong> {new Date(order.created).toLocaleDateString()}
      </p>
      <p>
        <strong>status:</strong> {order.status}
      </p>
    </div>
  );
};

export default OrderCard;

// PaymentSuccessPage.js

import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-green-600">
          Payment Successful
        </h2>
        <p className="text-gray-700">
          Thank you for your payment. Your transaction was successful.
        </p>
        <Link to={"/myOrders"} className="font-semibold text-custom-purple">
          Go to myorders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;

// PaymentFailedPage.js

import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-red-600">
          Payment Failed
        </h2>
        <p className="text-gray-700">
          Sorry, your payment was unsuccessful. Please try again later.
        </p>
        <Link to={"/cart"} className="font-semibold text-custom-purple">
          Go to cart
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;

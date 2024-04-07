import { useGetCart } from "./useGetCart";
import CartItem from "./CartItem";
import LoadingScreen from "../../components/LoadingScreen";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentService } from "../../services/orders.service";

const CartPage = () => {
  const { isLoading, cart, error } = useGetCart();
  let totalCost = 0;

  if (isLoading) return <LoadingScreen />;

  if (!cart)
    return (
      <p className="mt-10 flex justify-center">Please add item to cart.</p>
    );

  if (error)
    return (
      <p className="m-10 flex justify-center">
        Cart is empty. Please add products.
      </p>
    );

  cart.products.forEach((item) => {
    const { product, quantity } = item;
    const { price } = product;
    const itemTotal = price * quantity;
    totalCost += itemTotal;
  });

  async function makePayment() {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
    const body = cart;
    try {
      const session = await makePaymentService(body);

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
      // console.log("Order created successfully:", result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mx-20">
      <div>
        {cart.products.map((item) => (
          <CartItem key={item.product._id} item={item} />
        ))}
      </div>

      <div className="rounded-lg bg-gray-100 p-4">
        <h2 className="mb-2 text-lg font-semibold">Total Cart Price</h2>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-700">Total:</span>
            <span className="font-semibold text-blue-500">
              ${totalCost.toFixed(2)}
            </span>
          </div>
          <div>
            <button
              onClick={makePayment}
              className="rounded-md bg-custom-purple px-4 py-2 text-custom-gray"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

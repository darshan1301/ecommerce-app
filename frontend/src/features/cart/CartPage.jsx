import { useGetCart } from "./useGetCart";
import CartItem from "./CartItem";
import LoadingScreen from "../../components/LoadingScreen";

const CartPage = () => {
  const { isLoading, cart, error } = useGetCart();
  let totalCost = 0;

  if (isLoading) return <LoadingScreen />;

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
            <button className="rounded-md bg-custom-purple px-4 py-2 text-custom-gray">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

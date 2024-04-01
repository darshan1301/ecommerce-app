/* eslint-disable react/prop-types */

import { useAddToCart } from "../products/useAddToCart";
import { useCartDelete } from "./useCartDelete";
import { useCartEdit } from "./useCartEdit";

const CartItem = ({ item }) => {
  const { isAdding, addToCart } = useAddToCart();
  const { isDeleting, deleteFromCart } = useCartDelete();
  const { isEditing, editCart } = useCartEdit();
  const { product, quantity } = item;

  const handleIncrease = () => {
    addToCart(product._id);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      editCart(product._id);
    }
  };

  const handleDelete = () => {
    deleteFromCart(product._id);
  };

  return (
    <div className="flex items-center border-b border-gray-200 py-4">
      <img
        src={product.image}
        alt={product.title}
        className="mr-4 h-16 w-16 rounded-lg"
      />
      <div>
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-500">Price: ${product.price}</p>
        <p className="text-gray-500">Quantity: {quantity}</p>
      </div>
      <div className="ml-auto flex items-center justify-end gap-2">
        <button
          disabled={isAdding}
          className="mr-2 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-custom-blue"
          onClick={handleIncrease}
        >
          +
        </button>
        <p className="text-lg font-semibold">{quantity}</p>
        <button
          disabled={isEditing}
          className="mr-2 bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={handleDecrease}
        >
          -
        </button>
        <button
          disabled={isDeleting}
          className="bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;

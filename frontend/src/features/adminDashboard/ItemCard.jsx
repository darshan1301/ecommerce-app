import { useNavigate } from "react-router-dom";
import { useDeleteItem } from "./useDeleteItem";

/* eslint-disable react/prop-types */
const ItemCard = ({ product }) => {
  const navigate = useNavigate();
  const { isDeleting, deleteProduct } = useDeleteItem();
  return (
    <div className="h-auto w-72 self-center rounded-lg bg-white py-3">
      <div className="flex h-48 w-full items-center justify-center overflow-hidden bg-white object-cover">
        <img src={product.image} width={"110px"} />
      </div>
      <div className=" mt-1 space-y-1 px-4 py-1 text-center">
        <h2 className="truncate text-sm text-black">{product.title}</h2>
        <p className="text-xs uppercase">{product.category}</p>
        <p className="p-1 font-semibold">${product.price}</p>
      </div>
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => navigate(`/edit/${product._id}`)}
          className=" rounded-md border border-black px-4 py-1 text-sm font-light uppercase text-black hover:bg-black hover:text-custom-gray"
        >
          Edit Item
        </button>
        <button
          disabled={isDeleting}
          onClick={() => deleteProduct(product._id)}
          className="rounded-md border border-red-500 px-4 py-1 text-sm font-light uppercase text-red-500 hover:bg-red-500 hover:text-custom-gray"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;

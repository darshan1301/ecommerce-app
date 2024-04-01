import { useAddToCart } from "./useAddToCart";

/* eslint-disable react/prop-types */
const ProductCard = ({ product }) => {
  const { isAdding, addToCart } = useAddToCart();
  return (
    <div className="h-auto w-72 self-center rounded-lg bg-white py-3">
      {/* <Link to={`/product/${product.id}`}> */}
      <div className="flex h-48 w-full items-center justify-center overflow-hidden bg-white object-cover">
        <img src={product.image} width={"110px"} />
      </div>
      {/* </Link> */}
      <div className=" mt-1 space-y-1 px-4 py-1 text-center">
        <h2 className="truncate text-sm text-black">{product.title}</h2>
        <p className="text-xs uppercase">{product.category}</p>
        <p className="p-1 font-semibold">${product.price}</p>
      </div>
      <div className="flex justify-center">
        <button
          disabled={isAdding}
          onClick={() => addToCart(product._id)}
          className=" rounded-md border border-black px-4 py-1 text-sm font-light uppercase text-black hover:bg-black hover:text-custom-gray"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

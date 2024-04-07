import ProductCard from "./ProductCard";
import { useProducts } from "./useProducts";
import LoadingScreen from "../../components/LoadingScreen";

const AllProducts = () => {
  const { isLoading, products } = useProducts();

  if (isLoading) return <LoadingScreen />;

  if (products.length === 0)
    return <p className="mt-10 flex justify-center">No products.</p>;

  return (
    <div className="grid grid-cols-2 bg-custom-gray px-14 py-4 lg:grid-cols-4 lg:gap-4 lg:px-28">
      {products.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </div>
  );
};

export default AllProducts;

import LoadingScreen from "../../components/LoadingScreen";
import { useProducts } from "../products/useProducts";
import ItemCard from "./ItemCard";

const Items = () => {
  const { isLoading, products } = useProducts();
  if (isLoading) return <LoadingScreen />;
  return (
    <>
      {products.map((item) => (
        <ItemCard key={item.image} product={item} />
      ))}
    </>
  );
};

export default Items;

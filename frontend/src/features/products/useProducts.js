import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/products.service";

export const useProducts = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["Products"],
    queryFn: getAllProducts,
  });

  return { isLoading, error, products };
};

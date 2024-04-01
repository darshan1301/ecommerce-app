import { useQuery } from "@tanstack/react-query";
import { getCartService } from "../../services/cart.service";

export const useGetCart = () => {
  const {
    isLoading,
    error,
    data: cart,
  } = useQuery({
    queryKey: ["Cart"],
    queryFn: getCartService,
  });

  return { isLoading, error, cart };
};

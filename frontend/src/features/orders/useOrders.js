import { useQuery } from "@tanstack/react-query";
import { getAllOrdersService } from "../../services/orders.service";

export const useOrders = () => {
  const {
    isLoading,
    error,
    data: orders,
  } = useQuery({
    queryKey: ["Orders"],
    queryFn: getAllOrdersService,
  });

  return { isLoading, error, orders };
};

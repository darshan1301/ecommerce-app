import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addToCartService } from "../../services/cart.service";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { mutate: addToCart, isLoading: isAdding } = useMutation({
    mutationFn: addToCartService,
    onSuccess: () => {
      toast.success("Item Added to cart");
      queryClient.invalidateQueries({ queryKey: ["Cart"] });
    },
    onError: (err) => {
      console.log(err);
      return toast.error(err.message);
    },
  });
  return { isAdding, addToCart };
};

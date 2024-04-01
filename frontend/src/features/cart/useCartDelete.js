import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeFromCartService } from "../../services/cart.service";

export const useCartDelete = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteFromCart } = useMutation({
    mutationFn: removeFromCartService,
    onSuccess: () => {
      toast.success("Item removed from cart.");
      queryClient.invalidateQueries({
        queryKey: ["Cart"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteFromCart };
};

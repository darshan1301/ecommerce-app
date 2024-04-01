import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCartService } from "../../services/cart.service";

export const useCartEdit = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isEditing,
    mutate: editCart,
    error,
  } = useMutation({
    mutationFn: updateCartService,
    onSuccess: () => {
      toast.success("Cart Updated.");
      queryClient.invalidateQueries({
        queryKey: ["Cart"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editCart, error };
};

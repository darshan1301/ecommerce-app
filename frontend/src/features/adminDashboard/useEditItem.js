import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editProductService } from "../../services/products.service";

export const useEditItem = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isEditing,
    mutate: editProduct,
    error,
  } = useMutation({
    mutationFn: editProductService,
    onSuccess: () => {
      toast.success("Item Updated.");
      queryClient.invalidateQueries({
        queryKey: ["Products"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editProduct, error };
};

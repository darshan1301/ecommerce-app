import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProductService } from "../../services/products.service";

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,
    mutate: deleteProduct,
    error,
  } = useMutation({
    mutationFn: deleteProductService,
    onSuccess: () => {
      toast.success("Product Deleted.");
      queryClient.invalidateQueries({
        queryKey: ["Products"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteProduct, error };
};

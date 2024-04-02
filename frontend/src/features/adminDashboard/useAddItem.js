import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProductService } from "../../services/products.service";

export const useAddItem = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isAdding,
    mutate: addProduct,
    error,
  } = useMutation({
    mutationFn: addProductService,
    onSuccess: () => {
      toast.success("Product added.");
      queryClient.invalidateQueries({
        queryKey: ["Products"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isAdding, addProduct, error };
};

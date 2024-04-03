import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../features/products/useProducts";
import LoadingScreen from "../components/LoadingScreen";
import { useEditItem } from "../features/adminDashboard/useEditItem";
import ProductForm from "../features/adminDashboard/ProductForm";

const EditProduct = () => {
  const { productId } = useParams();
  const { isLoading, products } = useProducts();
  const { isEditing, editProduct } = useEditItem();
  const navigate = useNavigate();

  function handleEdit(updatedProduct) {
    editProduct({ productId, updatedProduct });
    navigate("/admin");
  }

  if (isLoading || isEditing) return <LoadingScreen />;
  const productDetails = products.filter((item) => item._id === productId);
  return (
    <div className="mx-20 mt-10">
      <ProductForm initialProduct={productDetails[0]} onSubmit={handleEdit} />
    </div>
  );
};

export default EditProduct;

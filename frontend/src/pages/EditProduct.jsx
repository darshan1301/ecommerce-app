import { useParams } from "react-router-dom";
import { useProducts } from "../features/products/useProducts";
import ProductForm from "../features/adminDashboard/ProductForm";
import LoadingScreen from "../components/LoadingScreen";
import { useEditItem } from "../features/adminDashboard/useEditItem";

const EditProduct = () => {
  const { productId } = useParams();
  const { isLoading, products } = useProducts();
  const { isEditing, editProduct } = useEditItem();

  function handleEdit(product) {
    editProduct(productId, product);
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

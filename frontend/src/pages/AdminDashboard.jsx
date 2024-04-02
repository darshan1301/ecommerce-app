import { useState } from "react";
import Items from "../features/adminDashboard/Items";
import ProductForm from "../features/adminDashboard/ProductForm";
import { useAddItem } from "../features/adminDashboard/useAddItem";

const AdminDashboard = () => {
  const [openForm, setOpenForm] = useState(false);
  const { isAdding, addProduct } = useAddItem();

  function handleAddProduct(product) {
    addProduct(product);
    if (!isAdding) setOpenForm(false);
  }

  return (
    <>
      <div className="flex justify-end bg-custom-gray px-32 pt-2">
        {openForm ? (
          <button
            disabled={isAdding}
            onClick={() => setOpenForm(false)}
            className="self-start rounded-sm border border-black px-4 py-2 "
          >
            Cancel
          </button>
        ) : (
          <button
            disabled={isAdding}
            onClick={() => setOpenForm(true)}
            className="self-end rounded-sm bg-custom-purple px-4 py-2 text-white"
          >
            Add Product
          </button>
        )}
      </div>
      <div className="bg-custom-gray px-32">
        {openForm && <ProductForm onSubmit={handleAddProduct} />}
      </div>
      <div className="grid grid-cols-2 gap-4 bg-custom-gray px-14 py-4 lg:grid-cols-4 lg:px-28">
        <Items />
      </div>
    </>
  );
};

export default AdminDashboard;

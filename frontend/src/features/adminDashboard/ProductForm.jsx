/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ initialProduct = {}, onSubmit }) => {
  const [product, setProduct] = useState(initialProduct);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="grid grid-cols-1 gap-8 divide-y-2">
        {initialProduct.image && <img src={product.image} width={"100px"} />}
        <div className="flex items-center">
          <label>
            Title:
            <input
              className="m-1 rounded-sm border border-black p-1"
              type="text"
              name="title"
              value={product.title || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="flex items-center">
          <label>
            Price($):
            <input
              className="m-1 rounded-sm border border-black p-1"
              style={{ scrollBehavior: "auto" }}
              type="number"
              name="price"
              value={product.price || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="flex items-baseline justify-start space-x-2 overflow-hidden">
          <label>Description:</label>
          <textarea
            className="m-1 w-max rounded-sm border border-black p-1"
            name="description"
            value={product.description || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center">
          <label>
            Image URL:
            <input
              className="m-1 rounded-sm border border-black p-1"
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) =>
                handleChange({
                  target: { name: "image", value: e.target.files[0] },
                })
              }
            />
          </label>
        </div>
        <div className="flex items-center">
          <label>
            Category:
            <input
              className="m-1 rounded-sm border border-black p-1"
              type="text"
              name="category"
              value={product.category || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className=" flex justify-end space-x-4 ">
          {initialProduct.price && (
            <button
              className="my-2 rounded-sm border border-custom-purple px-6 py-2 text-sm uppercase text-custom-purple"
              type="submit"
              onClick={() => navigate(-1)}
            >
              cancel
            </button>
          )}
          <button
            className="my-2 rounded-sm bg-custom-purple px-6 py-2 text-sm uppercase text-white"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;

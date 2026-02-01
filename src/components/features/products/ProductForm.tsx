import Button from "../../../components/ui/Button";
import { addProduct, editProduct } from "../../../store/slices/productSlice";
import { type RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
interface ProductFormProps {
  onClose: () => void;

  type?: "add" | "edit";
  product?: {
    id: number;
    title: string;
    price: number;
    stock: number;
    category: string;
    timestamp: number;
  };
}

const ProductForm = ({ type = "add", product, onClose }: ProductFormProps) => {
  const products = useSelector((state: RootState) => state.product.list);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const finalProduct = {
      id: product?.id || products.length + 1,
      title: String(formData.get("title")),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      category: String(formData.get("category")),
      timestamp: Date.now(),
    };

    if (type === "add") {
      dispatch(addProduct(finalProduct));
      e.currentTarget.reset();
    } else {
      dispatch(editProduct(finalProduct));
      onClose();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="dialog"
      aria-labelledby="Add New Product"
      className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Add New Product</h2>
      <div className="space-y-2 flex flex-col">
        <label htmlFor="title" className="font-medium">
          Product Details
        </label>
        <input
          defaultValue={product && product.title}
          required
          className="border-b border-gray-300 p-2"
          name="title"
          type="text"
          id="title"
          placeholder="Product Title"
        />
        <label htmlFor="price" className="font-medium">
          Price
        </label>
        <input
          defaultValue={product && product.price}
          required
          min="1"
          className="border-b border-gray-300 p-2"
          name="price"
          type="number"
          id="price"
          placeholder="Price"
        />
        <label htmlFor="stock" className="font-medium">
          Stock
        </label>
        <input
          defaultValue={product && product.stock}
          required
          min="1"
          className="border-b border-gray-300 p-2"
          name="stock"
          type="number"
          id="stock"
          placeholder="Stock"
        />
        <label htmlFor="category" className="font-medium">
          Category
        </label>
        <input
          defaultValue={product && product.category}
          required
          className="border-b border-gray-300 p-2"
          name="category"
          type="text"
          id="category"
          placeholder="(Accessories, Electronics, Furniture, Appliances, Electronics)"
        />
      </div>

      {type === "add" ? (
        <Button color="white" text="Add Product" type="submit" />
      ) : (
        <Button color="white" text="Edit Product" type="submit" />
      )}
    </form>
  );
};

export default ProductForm;

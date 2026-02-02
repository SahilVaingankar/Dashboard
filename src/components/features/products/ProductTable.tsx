// import { useDispatch, useSelector } from "react-redux";
// import type { RootState } from "@/store/store";
// import Button from "../../ui/Button";
// import { Activity, useState } from "react";
// import Modal from "../../ui/Modal";
// import ProductForm from "./ProductForm";
// import { removeProduct } from "@/store/slices/productSlice";

// const Products = () => {
//   const products = useSelector((state: RootState) => state.product.list);
//   const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
//   const [type, setType] = useState<"add" | "edit">("add");
//   const dispatch = useDispatch();

//   return (
//     <div className="w-full">
//       <table className="w-full border border-gray-500 text-xs sm:text-base">
//         <thead>
//           <tr className="bg-gray-500 text-black">
//             <th className=" p-2 text-left">Title</th>
//             <th className=" p-2 text-center">Price</th>
//             <th className=" p-2 text-center">Stock</th>
//             <th className=" p-2 text-center">Category</th>
//             <th className=" p-2 text-center">Date</th>
//             <th className=" p-2 text-center"></th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id} className="border border-gray-500">
//               <td className="p-2 text-left">{product.title}</td>
//               <td className="p-2 text-center">${product.price}</td>
//               <td className="p-2 text-center">{product.stock}</td>
//               <td className="p-2 text-center">{product.category}</td>
//               <td className="p-2 text-center">
//                 {new Date(product.timestamp).toLocaleDateString()}
//               </td>
//               <td className="p-2 text-right space-x-2">
//                 <button
//                   className="text-gray-400"
//                   onClick={() => {
//                     setIsModelOpen(!isModelOpen);
//                     setType("edit");
//                   }}>
//                   ➕
//                 </button>
//                 <button
//                   className="text-gray-400"
//                   onClick={() => {
//                     dispatch(removeProduct(product.id));
//                   }}>
//                   ❌
//                 </button>
//                 {/* <Button color="blue" text="Edit" onClick={() => {}} />
//                 <Button color="red" text="Delete" onClick={() => {}} /> */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="w-full text-right mt-2">
//         <Button
//           color="green"
//           text="Add Product"
//           onClick={() => {
//             setIsModelOpen(!isModelOpen);
//           }}
//         />
//       </div>
//       {/* <Button color="blue" text="Update Product" onClick={() => {}} /> */}
//       <Activity mode={isModelOpen ? "visible" : "hidden"}>
//         <Modal onClose={() => setIsModelOpen(false)}>
//           <ProductForm type={type} />
//         </Modal>
//       </Activity>
//     </div>
//   );
// };

// export default Products;

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import Button from "../../ui/Button";
import { useState } from "react"; // Removed Activity
import Modal from "../../ui/Modal";
import ProductForm from "./ProductForm";
import { removeProduct } from "../../../store/slices/productSlice";

const Products = () => {
  const products = useSelector((state: RootState) => state.product.list);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [type, setType] = useState<"add" | "edit">("add");

  // ADD THIS: Keep track of the product being edited
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const dispatch = useDispatch();

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setType("edit");
    setIsModelOpen(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setType("add");
    setIsModelOpen(true);
  };

  return (
    <div className="w-full">
      <table className=" w-full border border-gray-500 text-xs sm:text-base">
        <thead>
          <tr className="bg-gray-500 text-black">
            <th className=" p-1 sm:p2 text-left">Title</th>
            <th className=" p-1 sm:p2 text-center">Price</th>
            <th className=" p-1 sm:p2 text-center">Stock</th>
            <th className=" p-1 sm:p2 text-center">Category</th>
            <th className=" p-1 sm:p2 text-center">Date</th>
            <th className=" p-1 sm:p2 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border border-gray-500">
              <td className="p-1 sm:p-2 text-left">{product.title}</td>
              {/* <td className="p-1 sm:p-2 text-left">Laptop</td> */}
              <td className="p-1 sm:p-2 text-center">${product.price}</td>
              <td className="p-1 sm:p-2 text-center">{product.stock}</td>
              <td className="p-1 sm:p-2 text-center">{product.category}</td>
              <td className="p-1 sm:p-2 text-center">
                {new Date(product.timestamp).toLocaleDateString()}
              </td>
              <td className="p-2 text-right">
                <div className="flex gap-2 justify-end">
                  <button
                    aria-label="Edit product"
                    className="text-gray-400"
                    onClick={() => handleEdit(product)} // Pass the whole product
                  >
                    ➕
                  </button>
                  <button
                    aria-label="Delete product"
                    className="text-red-500"
                    onClick={() => dispatch(removeProduct(product.id))}>
                    ❌
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full text-right mt-2">
        <Button color="green" text="Add Product" onClick={handleAdd} />
      </div>

      {/* Simplified Modal Logic */}
      {isModelOpen && (
        <Modal onClose={() => setIsModelOpen(false)}>
          <ProductForm
            type={type}
            product={selectedProduct}
            onClose={() => setIsModelOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Products;

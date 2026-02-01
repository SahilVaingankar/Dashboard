import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  price: number;
  title: string;
  stock: number;
  category: string;
  timestamp: number;
}

interface ProductState {
  list: Product[];
}

const initialState: ProductState = {
  list: [
    {
      id: 1,
      title: "Apple iPhone 14",
      price: 799,
      stock: 12,
      category: "Electronics",
      timestamp: 1735689600000,
    },
    {
      id: 2,
      title: "Samsung Galaxy S23",
      price: 749,
      stock: 8,
      category: "Electronics",
      timestamp: 1735776000000,
    },
    {
      id: 3,
      title: "Sony Headphones",
      price: 199,
      stock: 25,
      category: "Accessories",
      timestamp: 1740995000000,
    },
    {
      id: 4,
      title: "Mechanical Keyboard",
      price: 129,
      stock: 18,
      category: "Accessories",
      timestamp: 1750048800000,
    },
    {
      id: 5,
      title: "Office Chair",
      price: 299,
      stock: 5,
      category: "Furniture",
      timestamp: 1741035200000,
    },
    {
      id: 6,
      title: "Standing Desk",
      price: 499,
      stock: 3,
      category: "Furniture",
      timestamp: 1745121600000,
    },
    {
      id: 7,
      title: "Running Shoes",
      price: 149,
      stock: 20,
      category: "Sports",
      timestamp: 1749508000000,
    },
    {
      id: 8,
      title: "Fitness Tracker",
      price: 99,
      stock: 30,
      category: "Sports",
      timestamp: 1750704400000,
    },
    {
      id: 9,
      title: "Coffee Maker",
      price: 89,
      stock: 15,
      category: "Appliances",
      timestamp: 1755850800000,
    },
    {
      id: 10,
      title: "Air Fryer",
      price: 179,
      stock: 10,
      category: "Appliances",
      timestamp: 1765907200000,
    },
  ],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.list.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id);

      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { addProduct, removeProduct, editProduct } = productSlice.actions;
export default productSlice.reducer;

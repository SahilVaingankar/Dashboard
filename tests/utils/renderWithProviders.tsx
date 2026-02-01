// import { render } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import productReducer from "../../src/store/slices/productSlice";
// import type { ReactElement } from "react";

// interface RenderOptions {
//   preloadedState?: any;
//   store?: any;
// }

// export function renderWithProviders(
//   ui: ReactElement,
//   { preloadedState, store }: RenderOptions = {},
// ) {
//   const defaultState = {
//     product: {
//       list: [],
//       loading: false,
//       error: null,
//     },
//   };

//   const usedStore =
//     store ||
//     configureStore({
//       reducer: productReducer, // singular matches slice
//       preloadedState: preloadedState || defaultState,
//     });

//   return {
//     store: usedStore,
//     ...render(<Provider store={usedStore}>{ui}</Provider>),
//   };
// }

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../src/store/slices/productSlice";
import type { ReactElement } from "react";

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        product: productReducer, // ✅ CORRECT
      },
      preloadedState,
    }),
  }: {
    preloadedState?: {
      product: {
        list: any[];
        loading: boolean;
        error: string | null;
      };
    };
    store?: ReturnType<typeof configureStore>;
  } = {},
) {
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

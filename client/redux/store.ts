import { configureStore } from "@reduxjs/toolkit";
import adminProductsSlice from "./slices/adminProductsSlice";
import filtrationSlice from "./slices/filtrationSlice";
import productCreationSlice from "./slices/productCreationSlice";

export const store = configureStore({
  reducer: {
    filtration: filtrationSlice,
    adminProducts: adminProductsSlice,
    productCreation: productCreationSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
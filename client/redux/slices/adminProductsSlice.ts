import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../enums/Order";

interface AdminProductsState {
  limit: number
  page: number
  sortBy: string
  order: Order
  subcategoryId: string | null
}

const initialState: AdminProductsState = {
  limit: 5,
  page: 0,
  sortBy: 'default',
  order: Order.ASC,
  subcategoryId: null
}

export const adminProductsSlice = createSlice({
  name: 'adminProductsSlice',
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => { state.limit = action.payload },
    setPage: (state, action: PayloadAction<number>) => { state.page = action.payload },
    setSortBy: (state, action: PayloadAction<string>) => { state.sortBy = action.payload },
    setOrder: (state, action: PayloadAction<Order>) => { state.order = action.payload },
    setSubcategoryId: (state, action: PayloadAction<string>) => { state.subcategoryId = action.payload },
  }
})

export const { setLimit, setOrder, setPage, setSortBy, setSubcategoryId } = adminProductsSlice.actions
export default adminProductsSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Filter } from '../../types/Filter'

interface FiltrationState {
  filters: Filter[]
}

const initialState: FiltrationState = {
  filters: [],
}

export const filtrationSlice = createSlice({
  name: 'filtrationSlice',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Filter>) => {
      state.filters.find(filter => JSON.stringify(filter) === JSON.stringify(action.payload))
        ? state.filters = state.filters.filter(filter => JSON.stringify(filter) !== JSON.stringify(action.payload))
        : state.filters.push(action.payload)
    },
    resetFilters: (state) => { state.filters.length = 0 }
  }
})

export const { setFilters, resetFilters } = filtrationSlice.actions
export default filtrationSlice.reducer
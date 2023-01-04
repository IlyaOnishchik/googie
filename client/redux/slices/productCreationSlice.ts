import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Parameter = {
  name: string
  value: string
}

interface ProductCreationState {
  subcategoryId: string
  name: string
  price: number
  image: File | null
  parameter: Parameter | null
  parameters: Parameter[]
}

const initialState: ProductCreationState = {
  subcategoryId: '',
  name: '',
  price: 0,
  image: null,
  parameter: null,
  parameters: []
}

export const productCreationSlice = createSlice({
  name: 'productCreationSlice',
  initialState,
  reducers: {
    setSubcategoryId: (state, action: PayloadAction<string>) => { state.subcategoryId = action.payload },
    setName: (state, action: PayloadAction<string>) => { state.name = action.payload },
    setPrice: (state, action: PayloadAction<number>) => { state.price = action.payload },
    setImage: (state, action: PayloadAction<File>) => { state.image = action.payload },
    changeParameter: (state, action: PayloadAction<Parameter | null>) => { state.parameter = action.payload },
    addParameter: (state) => { 
      state.parameter && !state.parameters.find(item => item.name === state.parameter?.name) && state.parameters.push(state.parameter)
    },
    removeParameter: (state, action: PayloadAction<Parameter>) => { 
      state.parameters = state.parameters.filter(item => item.name !== action.payload.name)
    },
    changeParameterValue: (state, action: PayloadAction<Parameter>) => {
      const index = state.parameters.findIndex(item => item.name === action.payload.name)
      state.parameters[index].value = action.payload.value
    }
  }
})

export const { setSubcategoryId, setImage, setName, setPrice, changeParameter, addParameter, removeParameter, changeParameterValue } = productCreationSlice.actions
export default productCreationSlice.reducer
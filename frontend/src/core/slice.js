import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'profile',
  initialState: {
    name: '',
  },
  reducers: {
    stepan: (state) => {
      state.name = "Степан"
    },
    dimon: (state) => {
      state.name = "Димон"
    },
  },
})

// Action creators are generated for each case reducer function
export const { stepan, dimon } = counterSlice.actions

export default counterSlice.reducer
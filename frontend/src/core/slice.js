import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'chat',
  initialState: {
    chatid: '0',
  },
  reducers: {
    saveid: (state, action) => {
      state.chatid = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveid, } = counterSlice.actions

export default counterSlice.reducer
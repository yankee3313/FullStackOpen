import { createSlice } from '@reduxjs/toolkit'
  
const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange: (state, action) => action.payload,
  },

})

export default filterSlice.reducer
export const { filterChange } = filterSlice.actions
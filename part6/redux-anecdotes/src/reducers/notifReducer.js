import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
    name: 'notification',
    initialState: 'test notification',
    reducers: {
      notifChange: (state, action) => action.payload,
    },
  
  })

export default notifSlice.reducer
export const { notifChange } = notifSlice.actions
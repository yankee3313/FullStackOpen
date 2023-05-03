import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
      notifChange: (state, action) => action.payload,
      resetNotif: () => null,
    },
  
  })

export default notifSlice.reducer
export const { notifChange, resetNotif } = notifSlice.actions
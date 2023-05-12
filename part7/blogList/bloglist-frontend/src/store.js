import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer'

const store = configureStore({
  reducer: {
    notification: notifReducer
  }
})

export default store
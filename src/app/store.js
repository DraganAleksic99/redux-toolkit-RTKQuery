import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import apiSlice from '../features/api/apiSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: usersReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store

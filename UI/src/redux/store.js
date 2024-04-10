import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { customerApi } from './customerReducer'
import { transactionApi } from './transactionReducer'
import { adminApi } from './adminReducer'


export const store = (preloadedState) => configureStore({
  reducer: {
    [customerApi.reducerPath]: customerApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([transactionApi.middleware, customerApi.middleware, adminApi.middleware]),
})

setupListeners(store().dispatch)
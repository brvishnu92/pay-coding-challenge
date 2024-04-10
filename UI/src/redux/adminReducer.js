import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { serverUrl } from '../utils/constants'

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
  }),
  tagTypes: ['Balance'],
  endpoints: (builder) => ({
    bankBalance: builder.query({
      query: () => ({
        url: `${serverUrl}bankBalance`,
        method: 'GET',
      }),
      providesTags: ['Balance'],
    }),
  }),
})
export const { useBankBalanceQuery } = adminApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { serverUrl } from '../utils/constants'


export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({
  }),
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: (body) => ({
        url: `${serverUrl}transaction`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Transactions'],
    }),
    withdrawFunds: builder.mutation({
      query: (body) => ({
        url: `${serverUrl}transaction/withdraw`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Transactions'],
    }),
    depositFunds: builder.mutation({
      query: (body) => ({
        url: `${serverUrl}transaction/deposit`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Transactions'],
    }),
  }),
})

export const { useCreateTransactionMutation, useWithdrawFundsMutation, useDepositFundsMutation } = transactionApi
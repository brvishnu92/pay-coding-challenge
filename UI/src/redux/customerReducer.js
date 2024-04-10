import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { serverUrl } from '../utils/constants'

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
  }),
  tagTypes: ['Customers'],
  endpoints: (builder) => ({
    getCustomer: builder.query({
      query: (id) => ({
        url: `${serverUrl}customer/${id}`,
        method: 'GET',
      }),
      providesTags: ['Customers'],
    }),
    createCustomer: builder.mutation({
      query: (body) => ({
        url: `${serverUrl}customer`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Customers'],
    }),
  }),
})

export const { useGetCustomerQuery, useCreateCustomerMutation } = customerApi
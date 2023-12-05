import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  tagTypes: ['Post'],
  // not using builder variable triggers an eslint warning, but its a required syntax
  // eslint-disable-next-line
  endpoints: builder => ({})
})

export default apiSlice

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://my-json-server.typicode.com/DraganAleksic99/redux-toolkit-RTKQuery'
  }),
  tagTypes: ['Post'],
  // not using builder variable triggers an eslint warning, but its a required syntax
  // eslint-disable-next-line
  endpoints: builder => ({})
})

export default apiSlice

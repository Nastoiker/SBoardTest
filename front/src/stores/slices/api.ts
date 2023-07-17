import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {api_url} from "@/domen.api";

const getToken = () => localStorage.getItem("token")
export const SBOARDApi = createApi({
  reducerPath: "SBOARDApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${api_url}/post`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getPost: builder.query({
      query: () => ({
        url: "/",
        method: "get",
      }),
    }),
    createPost: builder.mutation({
      query: (register) => ({
        url: "/",
        method: "POST",
        body: {...register},
        headers: {
          'Content-Type': 'application/json',
        }
      }),
    }),
    getPostOne: builder.query({
      query: (userId: number) => ({
        url: "/" + userId,
        method: "get",
      }),
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetPostQuery, useGetPostOneQuery, useCreatePostMutation } = SBOARDApi;

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
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
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
      invalidatesTags: ['Posts'],
    }),
    delPost: builder.mutation({
      query: (id) => ({
        url: "/" + id,
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: builder.mutation({
      query: (updatePost) => ({
        url: "/" + updatePost.id,
        method: "PUT",
        body: {...updatePost.value},
        headers: {
          'Content-Type': 'application/json',
        }
      }),
      invalidatesTags: ['Posts'],
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
export const { useGetPostsQuery, useGetPostOneQuery, useCreatePostMutation, useDelPostMutation, useUpdatePostMutation } = SBOARDApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import {api} from "@/config/api";

export const UserApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${api}/user`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    users: builder.query({
      query: () => ({
        url: "/",
        method: "get",
      }),
    }),
  })
});
export const {
  useUsersQuery,
} = UserApi

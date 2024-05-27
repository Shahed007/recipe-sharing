import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UserProps {
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  coins?: number | null;
}

export const recipe_slice_api = createApi({
  reducerPath: "recipe_share",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:500" }),
  endpoints: (builder) => ({
    getSingleData: builder.query<object, string>({
      query: (email) => `/user?email=${email}`,
    }),
    createUser: builder.mutation<void, { user: UserProps | null }>({
      query: (user) => ({
        url: `/user`,
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetSingleDataQuery, useCreateUserMutation } =
  recipe_slice_api;

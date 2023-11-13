/* eslint-disable @typescript-eslint/return-await */
// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5001'; // Define your base URL

export const auth = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/sendResetPasswordEmail',
        method: 'POST',
        body: email,
        responseHandler: async (response) => response.text(),
      }),
    }),
    confirmEmail: builder.mutation({
      query: (data) => ({
        url: '/auth/confirmEmail',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
  }),
});

// Add a type annotation for 'auth'
type AuthApi = typeof auth;

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useConfirmEmailMutation,
} = auth as AuthApi;

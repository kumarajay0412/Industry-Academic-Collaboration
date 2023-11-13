/* eslint-disable @typescript-eslint/return-await */
// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5001'; // Define your base URL

export const organisationsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAcademicOrganisation: builder.query({
      query: () => ({
        url: '/organisations/academic',
        method: 'GET',
      }),
    }),
    getIndustryOrganisation: builder.query({
      query: () => ({
        url: '/organisations/industry',
        method: 'GET',
      }),
    }),
  }),
});
type OrganisationsApi = typeof organisationsApi;

export const {
  useGetAcademicOrganisationQuery,
  useGetIndustryOrganisationQuery,
} = organisationsApi as OrganisationsApi;

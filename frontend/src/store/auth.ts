// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Type } from 'lucide-react';

const baseUrl = 'http://localhost:5000'; // Define your base URL
const getAccessToken = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  return accessToken ? `Bearer ${accessToken}` : '';
};
export const auth = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      const accessToken = getAccessToken();
      if (accessToken) {
        headers.set('Authorization', accessToken);
      }
      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    userDetails: builder.query({
      query: () => ({
        url: '/users/details',
        method: 'GET',
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
    createSupervise: builder.mutation({
      query: (data) => ({
        url: '/users/create_supervisee',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/resetPassword',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    setOrgRep: builder.mutation({
      query: (data) => ({
        url: '/users/org_rep',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    addOrganisation: builder.mutation({
      query: (data) => ({
        url: '/organisations',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    verifyMembers: builder.mutation({
      query: ({ data, id }) => ({
        url: `/organisations/verify_members/${id}`,
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
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
    unverifiedUsers: builder.query({
      query: (id) => ({
        url: `/organisations/members/unverified/${id}`,
        method: 'GET',
      }),
    }),
    verifiedUsers: builder.query({
      query: (id) => ({
        url: `/organisations/members/verified/${id}`,
        method: 'GET',
      }),
    }),
    addAreaOfInterest: builder.mutation({
      query: (data) => ({
        url: '/area-of-interest',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    getAreaOfInterest: builder.query({
      query: () => ({
        url: `/area-of-interest`,
        method: 'GET',
      }),
    }),
    getOrganisation: builder.query({
      query: ({ name, type }) => ({
        url: `/organisations?type=${type}&searchQuery=${name}`,
        method: 'GET',
      }),
    }),
    getUsers: builder.mutation({
      query: ({ query, type, data }) => ({
        url: `/users/search_users?role=${type}&searchQuery=${query}`,
        method: 'POST',
        body: { areasOfInterest: data },
        responseHandler: async (response) => response.text(),
      }),
    }),
    addSupervisee: builder.mutation({
      query: (data) => ({
        url: '/users/add_supervisees',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    makeRepresentative: builder.mutation({
      query: (data: any) => ({
        url: `/users/make_representative`,
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    verifyUsers: builder.mutation({
      query: (data: any) => ({
        url: `/users/verify_user`,
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    inviteUser: builder.mutation({
      query: (data: any) => ({
        url: `/users/invite`,
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    editProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    createDraftProject: builder.mutation({
      query: (data) => ({
        url: `/project/createDraft`,
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    sendVerificationProject: builder.mutation({
      query: (data) => ({
        url: `/project/sendVerificationRequest`,
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    projectVerify: builder.mutation({
      query: (data) => ({
        url: `/project/verify`,
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    potentialCollaborators: builder.query({
      query: ({ id }) => ({
        url: `/users/potential_collaborators/${id}`,
        method: 'GET',
      }),
    }),
    getProject: builder.query({
      query: (id) => ({
        url: `/project/${id}`,
        method: 'GET',
      }),
    }),
    editProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/project/${id}`,
        method: 'PATCH',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    getProjectList: builder.query({
      query: () => ({
        url: `/project`,
        method: 'GET',
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
  useResetPasswordMutation,
  useSetOrgRepMutation,
  useSignUpMutation,
  useAddOrganisationMutation,
  useUserDetailsQuery,
  useGetAcademicOrganisationQuery,
  useGetIndustryOrganisationQuery,
  useUnverifiedUsersQuery,
  useVerifiedUsersQuery,
  useAddAreaOfInterestMutation,
  useGetAreaOfInterestQuery,
  useGetOrganisationQuery,
  useCreateSuperviseMutation,
  useGetUsersMutation,
  useAddSuperviseeMutation,
  useMakeRepresentativeMutation,
  useVerifyUsersMutation,
  useInviteUserMutation,
  useEditProfileMutation,
  useCreateDraftProjectMutation,
  useSendVerificationProjectMutation,
  useProjectVerifyMutation,
  usePotentialCollaboratorsQuery,
  useGetProjectQuery,
  useGetProjectListQuery,
  useEditProjectMutation,
} = auth as AuthApi;

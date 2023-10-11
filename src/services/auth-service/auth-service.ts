import { baseApi } from '@/services/api.ts'
import { LoginArgs, SignUpArgs, SignUpResponseData } from '@/services/auth-service'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<any, void>({
        query: () => {
          return {
            url: `/v1/auth/me`,
          }
        },
        providesTags: ['Me'],
      }),
      logIn: builder.mutation<any, LoginArgs>({
        query: body => {
          return {
            url: `/v1/auth/login`,
            method: 'POST',
            body,
          }
        },
        invalidatesTags: ['Me'],
      }),
      logOut: builder.mutation<void, void>({
        query: () => {
          return {
            url: `/v1/auth/logout`,
            method: 'POST',
          }
        },
        invalidatesTags: ['Me'],
      }),
      signUp: builder.mutation<SignUpResponseData, SignUpArgs>({
        query: body => {
          return {
            url: `/v1/auth/sign-up`,
            method: 'POST',
            body,
          }
        },
      }),
    }
  },
})

export const { useLogInMutation, useMeQuery, useLogOutMutation, useSignUpMutation } = authService

// onQueryStarted: async (_, { getState, dispatch, queryFulfilled }) => {
//   try {
//     await queryFulfilled
//     dispatch(authService.util.updateQueryData('me', undefined, () => null))
//   } catch (error) {}
// },

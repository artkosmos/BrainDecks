import { baseApi } from '@/services/api.ts'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<any, void>({
        query: () => {
          return {
            url: `/v1/auth/me`,
          }
        },
        providesTags: ['User'],
      }),
      logIn: builder.mutation<any, LoginArgs>({
        query: body => {
          return {
            url: `/v1/auth/login`,
            method: 'POST',
            body,
          }
        },
        invalidatesTags: ['User'],
      }),
    }
  },
})

export const { useLogInMutation, useMeQuery } = authService

type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}

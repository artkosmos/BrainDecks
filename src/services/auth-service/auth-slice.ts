import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
  error: string | null
  success: string | null
}

const initialState: AuthState = {
  error: null,
  success: null,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.success = action.payload
    },
  },
})

export const authReducer = slice.reducer

export const { setErrorMessage, setSuccessMessage } = slice.actions

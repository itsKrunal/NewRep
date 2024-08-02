import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface UsersState {
  email: string
  password: string
  role: string
}

// Define the initial state using that type
const initialState: UsersState = {
  email: '',
  password: '',
  role: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UsersState>) => {
      return { ...state, ...action.payload }
    },
    resetUser: (state) => {
      return initialState
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer

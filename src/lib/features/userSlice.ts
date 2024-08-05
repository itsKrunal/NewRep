import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface UsersState {
  email: string
  role: string,
  reportsRight : Object,
  department : string,
  userName : string,
  eId : string
}

// Define the initial state using that type
//@ts-ignore
const initialState: UsersState = () => {
    //@ts-ignore
    const info : UsersState = JSON.parse(localStorage.getItem('user'));
    return info ? info : {
        email : '',
        role : '',
        reportsRight : {},
        department : '',
        userName : '',
        eId : '',
     };
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UsersState>) => {
      const newState =  { ...state, ...action.payload }
      localStorage.setItem("user", JSON.stringify(newState))
      return newState;
    },
    resetUser: (state) => {
      return initialState
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer

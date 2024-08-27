import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface UsersState {
  email: string
  role: string,
  reportsRight: Object,
  department: string,
  userName: string,
  eId: string,
  isHOD : boolean,
  hodDepartments : Array<String>
}

// Define the initial state using that type
const getInitialState = (): UsersState => {
  if (typeof window !== 'undefined') {
    const info = localStorage.getItem('user');
    return info ? JSON.parse(info) : {
      email: '',
      role: '',
      reportsRight: {},
      department: '',
      userName: '',
      eId: '',
      isHOD : '',
      hodDepartments : ''
    };
  } else {
    return {
      email: '',
      role: '',
      reportsRight: {},
      department: '',
      userName: '',
      eId: '',
      isHOD : false,
      hodDepartments : []
    };
  }
}

const initialState: UsersState = getInitialState();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UsersState>) => {
      const newState = { ...state, ...action.payload }
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(newState))
      }
      return newState;
    },
    resetUser: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem("user")
      }
      return getInitialState();
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer

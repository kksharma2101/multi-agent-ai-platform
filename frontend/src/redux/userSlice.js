import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        clearUserData: (state) => {  // Better name, no parameter
            state.userData = null
        },

    },
})

export const { setUserData, clearUserData } = userSlice.actions

export default userSlice.reducer
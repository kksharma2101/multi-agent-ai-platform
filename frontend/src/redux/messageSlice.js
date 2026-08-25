import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
    name: 'conversation',
    initialState: {
        messages: [],
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload
        },

    },
})

export const { setMessages } = messageSlice.actions

export default messageSlice.reducer
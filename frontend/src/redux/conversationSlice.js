import { createSlice } from '@reduxjs/toolkit'

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        conversations: [],
        selectedConversation: null
    },
    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload
        },
        addConversation: (state, action) => {
            state.conversations.unshift(action.payload)
        },
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload
        },
        setConversationTitle: (state, action) => {
            const { conversationId, title } = action.payload;
            state.conversations.map((conv) => (
                conv?._id == conversationId ? ({ ...conv, title }) : conv
            ))

            // const conversation = state.conversations.find(
            //     (conv) => conv._id === conversationId
            // );

            // if (conversation) {
            //     conversation.title = title;
            // }

            if (state.selectedConversation?._id == conversationId) {
                state.selectedConversation = { ...state.selectedConversation, title };
            }
        }
    },
})

export const { setConversations, addConversation, setSelectedConversation, setConversationTitle } = conversationSlice.actions

export default conversationSlice.reducer
import { useDispatch, useSelector } from "react-redux"
import ChatInput from "./ChatInput"
import ChatNavbar from "./ChatNavbar"
import MessageList from "./MessageList"
import { useEffect } from "react"
import { getMessages } from "../features/getMessages"
import { setMessages } from "../redux/messageSlice"

const ChatArea = () => {
    const { selectedConversation } = useSelector(state => state.conversation);
    const dispatch = useDispatch();


    useEffect(() => {
        const getMsg = async () => {
            if (selectedConversation?.title == "New Chat") return

            if (selectedConversation) {
                const data = await getMessages(selectedConversation?._id);
                dispatch(setMessages(data))
            }
        }
        getMsg()
    }, [selectedConversation?._id])

    return (
        <div className='flex-1 flex flex-col'>
            <ChatNavbar />
            <MessageList />
            <ChatInput />
        </div>
    )
}

export default ChatArea
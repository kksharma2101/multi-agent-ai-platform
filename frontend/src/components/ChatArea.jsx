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
            if (selectedConversation) {
                const data = await getMessages(selectedConversation);
                dispatch(setMessages(data))
            }
        }
        getMsg()
    }, [selectedConversation])

    return (
        <div className='flex-1 flex flex-col'>
            <ChatNavbar />
            <MessageList />
            <ChatInput />
        </div>
    )
}

export default ChatArea
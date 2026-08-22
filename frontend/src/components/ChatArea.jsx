import ChatInput from "./ChatInput"
import ChatNavbar from "./ChatNavbar"
import MessageList from "./MessageList"

const ChatArea = () => {
    return (
        <div className='flex-1 flex flex-col'>
            <ChatNavbar />
            <MessageList />
            <ChatInput />
        </div>
    )
}

export default ChatArea
import { Mic, Paperclip, Send } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../features/sendMessage";
import { addMessage } from "../redux/messageSlice";
import { createConversation } from "../features/createConversation";
import { addConversation, setConversationTitle, setSelectedConversation } from "../redux/conversationSlice";
import { updateConversation } from "../features/updateConversation";

const ChatInput = () => {
    const { selectedConversation } = useSelector(state => state.conversation);
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const handleSendMsg = async () => {
        let conversation = selectedConversation;
        if (!conversation) {
            const newConversation = await createConversation()
            dispatch(setSelectedConversation(newConversation._id))
            dispatch(addConversation(newConversation))
            conversation = newConversation
        }

        if (conversation?.title == "New Chat") {
            await updateConversation({ id: conversation?._id, title: value.trim() })
            dispatch(setConversationTitle({ conversationId: conversation?._id, title: prompt.trim() }))
        }

        const payload = { prompt: value, conversationId: conversation?._id }
        dispatch(addMessage({ role: "user", content: value }));
        setValue("")
        const data = await sendMessage(payload)
        dispatch(addMessage({ role: "assistant", content: data }));
    }

    return (
        <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/6 bg-[#0d0f14]">
            <div className="flex flex-col gap-2 bg-white/3 border border-white/7 rounded-2xl px-4 pt-3.5 pb-3">
                <textarea onChange={(e) => setValue(e.target.value)} value={value} className="w-full bg-transparent outline-none resize-none text-sm text-slate-200 placeholder:text-slate-600 leading-relaxed scrollbar-none [&::-webkit-scrollbar]:hidden disabled:opacity-50" placeholder="Ask Anything..." rows={3} />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer">
                            <Paperclip size={16} />
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer" title="Speak">
                            <Mic size={16} />
                        </button>
                    </div>
                    <button disabled={!value} onClick={handleSendMsg} className={`flex items-center justify-center w-8 h-8 rounded-lg border-none cursor-pointer transition-all duration-150 ${value.trim() ? "bg-transparent bg-linear-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white" : "bg-white/5 text-slate-600 cursor-not-allowed"}`} title="Send">
                        <Send size={15} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatInput
import { Code2, FileText, Globe, ImageIcon, MessageSquare, Mic, Paperclip, Presentation, Send, Zap } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../features/sendMessage";
import { addMessage } from "../redux/messageSlice";
import { createConversation } from "../features/createConversation";
import { addConversation, setConversationTitle, setSelectedConversation } from "../redux/conversationSlice";
import { updateConversation } from "../features/updateConversation";

const ChatInput = () => {
    const dispatch = useDispatch();
    const [selectedAgent, setSelectedAgent] = useState("auto");
    const { selectedConversation } = useSelector(state => state.conversation);
    const [value, setValue] = useState("");

    const handleSendMsg = async () => {
        let conversation = selectedConversation;

        if (!conversation) {
            const newConversation = await createConversation()
            dispatch(setSelectedConversation(newConversation))
            dispatch(addConversation(newConversation))
            conversation = newConversation
        }

        if (conversation?.title == "New Chat") {
            await updateConversation({ id: conversation?._id, title: value.trim() })
            dispatch(setConversationTitle({ conversationId: conversation?._id, title: value.slice(0, 20) }))
        }

        const payload = { prompt: value, conversationId: conversation?._id, agent: selectedAgent }

        dispatch(addMessage({ role: "user", content: value }));

        setValue("")
        const data = await sendMessage(payload)
        dispatch(addMessage({ role: "assistant", content: data }));
    }

    const agents = [
        {
            id: "auto",
            icon: Zap,
            label: "Auto"
        },
        {
            id: "chat",
            icon: MessageSquare,
            label: "Chat"
        },
        {
            id: "coding",
            icon: Code2,
            label: "Coding"
        },
        {
            id: "pdf",
            icon: FileText,
            label: "Pdf"
        },
        {
            id: "ppt",
            icon: Presentation,
            label: "PPT"
        },
        {
            id: "image",
            icon: ImageIcon,
            label: "Image"
        },
        {
            id: "search",
            icon: Globe,
            label: "Search"
        },
    ]

    return (
        <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/6 bg-[#0d0f14]">
            <div className="flex flex-col gap-2 bg-white/3 border border-white/7 rounded-2xl px-4 pt-3.5 pb-3">
                <div className="flex w-[80%] gap-2 pr-2 flex-wrap">
                    {
                        agents.map((agent) => {
                            const isActive = selectedAgent === agent.id;
                            let Icon = agent.icon;
                            return (
                                <div onClick={() => setSelectedAgent(agent.id)} className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${isActive ? "bg-linear-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99,102,241,0.35)]" : "bg-white/5 text-slate-400 border-white/6 hover:bg-white/7"}`}>
                                    <Icon size={14} className={isActive ? "text-white" : "text-slate-500"} />
                                    {agent.label}
                                </div>
                            )
                        })
                    }
                </div>
                <textarea autoFocus onChange={(e) => setValue(e.target.value)} value={value} className="w-full bg-transparent outline-none resize-none text-sm text-slate-200 placeholder:text-slate-600 leading-relaxed scrollbar-none [&::-webkit-scrollbar]:hidden disabled:opacity-50" placeholder="Ask Anything..." rows={3} />
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
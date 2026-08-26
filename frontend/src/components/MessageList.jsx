import { useSelector } from "react-redux";
import MessageBubble from "./MessageBubble";

const MessageList = () => {
    const { selectedConversation } = useSelector(state => state.conversation)
    const { messages } = useSelector(state => state.messages);

    return (
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 scrollbar-none [&::-webkit-scrollbar]:hidden ">
            {
                messages?.length == 0 || !selectedConversation ? (
                    <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                        <div className="flex flex-col gap-1.5">
                            <h1 className="text-2xl font-semibold text-slate-200 tracking-tight">Cortex AI</h1>
                            <p className="text-base font-semibold text-slate-400 tracking-tight">How can I help you?</p>
                            <p className="text-sm text-slate-600 max-w-65 leading-relaxed">Ask me anythin - code, ideas, explanations, or just a quick question.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 mt-1">
                            {
                                ["write a Netflix clone", "Explain Redis", "Build a dashboard"].map((item, i) => (
                                    <button key={i} className="text-xs text-slate-400 bg-white/4 border border-white/7 px-3 py-1.5 rounded-lg hover:bg-white/8 hover:text-slate-200 transition-colors duration-150 cursor-pointer">{item}</button>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {
                            messages?.map((msg, i) => (
                                <div key={i}>
                                    <MessageBubble role={msg?.role} content={msg?.content} />
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default MessageList;
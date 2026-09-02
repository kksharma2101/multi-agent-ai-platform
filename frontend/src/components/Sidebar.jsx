import { useEffect, useState } from 'react'
import { Coins, LogOut, MessageSquare, PanelLeftIcon, PanelRight, PenSquare, Plus, User } from "lucide-react";
import { getConversation } from '../features/getConversations';
import { useDispatch, useSelector } from "react-redux";
import { addConversation, setConversations, setSelectedConversation } from '../redux/conversationSlice';
import { createConversation } from '../features/createConversation';
import api from '../../utils/axios';
import { clearUserData } from '../redux/userSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [imageError, setImageError] = useState(false);

    const { conversations, selectedConversation } = useSelector(state => state.conversation);
    const { userData } = useSelector(state => state.user);

    useEffect(() => {
        const getCon = async () => {
            const data = await getConversation()
            dispatch(setConversations(data))
        }
        getCon()
    }, []);

    const handleCreateConv = async () => {
        const data = await createConversation()
        dispatch(addConversation(data))
    };

    const handleSelectedConv = (conv) => {
        dispatch(setSelectedConversation(conv))
    };

    const handleLogout = async () => {
        try {
            await api.get("/auth/logout")
            dispatch(clearUserData(null))
        } catch (error) {
            console.log(error)
        }
    }

    if (collapsed) {
        return (
            <div className="hidden lg:flex flex-col items-center w-14 h-screen bh-[#0d0f14] border-r border-white/6 py-4 gap-1 shrink-0 ">
                <button className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/6 transition-colors duration-150 bg-transparent border-none cursor-pointer mb-1" onClick={() => setCollapsed(false)}>
                    <PanelRight />
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/6 transition-colors duration-150 bg-transparent border-none cursor-pointer" onClick={() => dispatch(setSelectedConversation(null))}>
                    <Plus size={16} />
                </button>

                <div className="flex-1 overflow-y-auto px-2 pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden space-y-2 pt-6">
                    {
                        conversations.map((conv, i) => {
                            const isActive = selectedConversation?._id == conv?._id;
                            return (
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/6 transition-colors duration-150 bg-transparent border-none cursor-pointer" key={conv._id || i} onClick={() => handleSelectedConv(conv)}>
                                    <MessageSquare size={16} color={isActive ? "white" : "gray"} />
                                </div>
                            )
                        })
                    }
                </div>

                <div className="relative shrink-0 pt-2">
                    {
                        (userData?.avatar && !imageError) ?
                            (<img
                                className='w-9 h-9 rounded-lg object-cover border border-indigo-500'
                                src={userData.avatar} alt='user avatar' onError={() => setImageError(true)} />)
                            : (
                                <User size={15} className='text-slate-400' />
                            )
                    }
                </div>

            </div>
        )
    }

    return (
        <div className='fixed inset-y-0 left-0 h-screen lg:static z-50 shrink-0 w-67.5 border-r border-white/10'>
            <div className="flex flex-col h-full">
                <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/10 ">
                    <div className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer">
                        <PanelLeftIcon onClick={() => setCollapsed(true)} />
                    </div>
                    <span className="text-base font-semibold text-slate-100 tracking-tight flex-1">CotexAI</span>
                    <span className="text-xs font-medium text-indigo-400 bg-indigo-500 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide w-fit text-center">Free</span>
                    <button className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/0.05 transition-colors duration-150 bg-transparent border-none cursor-pointer" onClick={() => dispatch(setSelectedConversation(null))} title='New Chat'>
                        <PenSquare size={14} />
                    </button>
                </div>

                <div className="px-4 pt-4 pb-1">
                    <button className="bg-blue-600 w-full flex items-center justify-center rounded-md py-2 gap-2 cursor-pointer" onClick={() => dispatch(setSelectedConversation(null))}>
                        <Plus /> New Chat
                    </button>
                </div>

                {
                    conversations.length == 0 ? (
                        <div className="px-5 pt-4  pb-2 text-xs font-semibold uppercase tracking-widest text-slate-600">No conversations</div>
                    ) : (
                        <div className="px-5 pt-4  pb-2 text-xs font-semibold uppercase tracking-widest text-slate-600">Recent</div>
                    )
                }
                <div className="flex-1 overflow-y-auto px-2 pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden space-y-2">
                    {
                        conversations.map((conv, i) => {
                            const isActive = selectedConversation?._id == conv?._id;
                            return (
                                <div className={`${isActive && "bg-indigo-400"} p-2 cursor-pointer hover:bg-indigo-400 rounded-md flex justify-start gap-2 items-center`} key={conv._id || i} onClick={() => handleSelectedConv(conv)}>
                                    <MessageSquare size={12} className='text-indigo-500' />
                                    <span className='truncate'>{conv.title}</span>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="mx-2.5 h-px bg-white/6 " />

                <div className="p-2 ">
                    {
                        userData ? (
                            <div className="flex items-center cursor-pointer gap-2 rounded-xl p-2 hover:bg-white/10 transition-colors duration-150">
                                <div className="relative shrink-0">
                                    {
                                        (userData?.avatar && !imageError) ?
                                            (<img
                                                className='w-9 h-9 rounded-lg object-cover border border-indigo-500'
                                                src={userData.avatar} alt='user avatar' onError={() => setImageError(true)} />)
                                            : (
                                                <User size={15} className='text-slate-400' />
                                            )
                                    }
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-slate-100 truncate">{userData?.name || "User"}</p>
                                    <p className="text-xs text-slate-600 mt-px">{"Free Plan"}</p>
                                </div>

                                <div className="flex gap-1">
                                    <button className="flex justify-center items-center w-7 h-7 rounded-md border-none bg-transparent text-yellow-600 cursor-pointer hover:bg-white/6 hover:text-slate-400 transition-all duration-150">
                                        <Coins size={15} /></button>
                                    <button className="flex justify-center items-center w-7 h-7 rounded-md border-none bg-transparent text-slate-600 cursor-pointer hover:bg-white/6 hover:text-slate-400 transition-all duration-150" onClick={handleLogout} title='Logout'>
                                        <LogOut size={16} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button className="">Login</button>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Sidebar
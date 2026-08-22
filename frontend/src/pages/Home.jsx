import React from 'react'
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../utils/firebase'
import api from '../../utils/axios';
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import Artifect from '../components/Artifact';

function Home() {
    const { userData } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogin = async (token) => {
        try {
            const { data } = await api.post("/auth/login", { token })
            dispatch(setUserData(data.user))
        } catch (error) {
            console.log(error)
        }
    }

    const signInWithGoogle = async () => {
        const data = await signInWithPopup(auth, googleProvider);
        const token = await data.user.getIdToken();
        await handleLogin(token)
        // console.log(token)
    }

    return (
        <div className='h-screen flex bg-[#0d0f14] text-white overflow-hidden'>
            <Sidebar />
            <ChatArea />
            <Artifect />
            {!userData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="w-85 bg-[#13151c] border border-white/1 rounded-2xl p-7 flex flex-col gap-5 ">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-base font-semibold text-slate-100 tracking-tight">Welcome to CortexAI</h2>
                            <p className="text-xs text-slate-500">Plase login to continue using the app.</p>
                        </div>
                        <button className='flex items-center justify-center gap-3 w-full py-4 rounded-xl text-sm font-bold bg-white text-black transition-all duration-150 cursor-pointer' onClick={signInWithGoogle}>
                            <FcGoogle size={15} /> Continue With Google
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home
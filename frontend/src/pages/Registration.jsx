import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import lsc_bg from '../assets/lsc_bg.webp'
import google from '../assets/google.png'
import { IoEyeOutline, IoEye } from "react-icons/io5"
import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import Loading from '../component/Loading'
import { toast } from 'react-toastify'

function Registration() {
    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { serverUrl } = useContext(authDataContext)
    const { getCurrentUser } = useContext(userDataContext)
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + '/api/auth/registration', { name, email, password }, { withCredentials: true })
            await getCurrentUser()
            navigate("/")
            toast.success("User Registration Successful")
        } catch (error) {
            toast.error(error?.response?.data?.message || "User Registration Failed")
        } finally {
            setLoading(false)
        }
    }

    const googleSignup = async () => {
        setLoading(true)
        try {
            const response = await signInWithPopup(auth, provider)
            const user = response.user
            const userEmail = user.email || ''
            const userName = user.displayName || (userEmail.includes('@') ? userEmail.split('@')[0] : 'User')
            const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name: userName, email: userEmail }, { withCredentials: true })
            await getCurrentUser()
            navigate("/")
            toast.success("User Registration Successful")
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.code || error?.message || "User Registration Failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="w-full h-screen flex flex-col overflow-hidden"
            style={{
                backgroundImage: `url(${lsc_bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Top navbar */}
            <div
                className="w-full h-[64px] flex items-center justify-start px-8 cursor-pointer flex-shrink-0"
                onClick={() => navigate("/")}
            >
                <button
                    onClick={() => navigate("/")}
                    style={{ fontFamily: 'Playfair Display' }}
                    className="xl:text-4xl lg:text-3xl sm:text-3xl text-2xl"
                >
                    Furnito
                </button>
            </div>

            {/* Centered content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4">

                {/* Heading outside card */}
                <div className="text-center mb-5 flex flex-col items-center gap-3">
                    {/* Pill background behind heading for visibility on light bg */}
                    <div
                        className="px-8 py-2 rounded-full"
                        style={{
                            background: 'rgba(0,0,0,0.28)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.18)',
                        }}
                    >
                        <h2
                            className="text-5xl font-bold text-blue-200"
                            style={{ fontFamily: '"Italiana", serif' }}
                        >
                            Create Account
                        </h2>
                    </div>
                    {/* Subtitle pill */}
                    <div
                        className="px-5 py-1.5 rounded-full"
                        style={{
                            background: 'rgba(0,0,0,0.22)',
                            backdropFilter: 'blur(6px)',
                            WebkitBackdropFilter: 'blur(6px)',
                            border: '1px solid rgba(255,255,255,0.15)',
                        }}
                    >
                        <p className="text-[14px] font-semibold text-white/95 tracking-wide">
                            Join Furnito and start exploring premium furniture.
                        </p>
                    </div>
                </div>

                {/* Glassmorphism Card — richer tint for clear readability */}
                <div
                    className="w-full max-w-[540px] rounded-2xl px-10 py-8 flex flex-col gap-4"
                    style={{
                        background: 'rgba(255, 255, 255, 0.35)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1.5px solid rgba(255, 255, 255, 0.55)',
                        boxShadow: '0 8px 40px 0 rgba(30, 60, 120, 0.22), inset 0 1px 0 rgba(255,255,255,0.6)',
                    }}
                >
                    {/* Google Button */}
                    <button
                        type="button"
                        onClick={googleSignup}
                        className="w-full h-[54px] cursor-pointer bg-white text-gray-800 rounded-xl flex items-center justify-center gap-3 font-semibold text-[16px] shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-300"
                    >
                        <img src={google} alt="Google" className="w-[24px]" />
                        Sign Up with Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-[1px] bg-gray-400/60" />
                        <span className="text-gray-700 font-bold text-sm tracking-widest">OR</span>
                        <div className="flex-1 h-[1px] bg-gray-400/60" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignup} className="flex flex-col gap-3">
                        <input
                            type="text"
                            className="w-full h-[54px] bg-white border border-gray-300 rounded-xl px-5 text-gray-800 placeholder-gray-500 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
                            placeholder="Full Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="text"
                            className="w-full h-[54px] bg-white border border-gray-300 rounded-xl px-5 text-gray-800 placeholder-gray-500 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className="relative">
                            <input
                                type={show ? "text" : "password"}
                                className="w-full h-[54px] bg-white border border-gray-300 rounded-xl px-5 pr-14 text-gray-800 placeholder-gray-500 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors"
                                onClick={() => setShow(prev => !prev)}
                            >
                                {show ? <IoEye className="w-6 h-6" /> : <IoEyeOutline className="w-6 h-6" />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-[54px] cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-xl font-bold text-[18px] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-xl mt-1"
                        >
                            {loading ? <Loading /> : "Create Account"}
                        </button>
                    </form>

                    {/* Login link */}
                    <p className="text-center text-gray-700 text-[15px] font-semibold">
                        Already have an Account?{' '}
                        <span
                            className="text-blue-600 font-bold cursor-pointer underline hover:text-blue-800 transition-colors"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Registration

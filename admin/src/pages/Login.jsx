import React, { useContext, useState } from 'react'
import lsc_bg from '../assets/lsc_bg.webp'
import { IoEyeOutline, IoEye } from "react-icons/io5"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Login() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const { getAdmin } = useContext(adminDataContext)
  const navigate = useNavigate()

  const AdminLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + '/api/auth/adminlogin', { email, password }, { withCredentials: true })
      toast.success("Admin Login Successful")
      await getAdmin()
      navigate("/")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Admin Login Failed")
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
      <div className="w-full h-[64px] flex items-center justify-start px-8 flex-shrink-0">
        <span
          className="xl:text-4xl lg:text-3xl sm:text-3xl text-2xl"
          style={{ fontFamily: 'Playfair Display' }}
        >
          Furnito
        </span>
        <span
          className="ml-3 text-sm font-semibold text-gray-600 bg-white/70 px-2 py-0.5 rounded-full border border-gray-300 self-center"
        >
          Admin
        </span>
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
              style={{ fontFamily: 'Italiana' }}
            >
              Admin Login
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
              Access the Furnito admin dashboard securely.
            </p>
          </div>
        </div>

        {/* Glassmorphism Card */}
        <div
          className="w-full max-w-[540px] rounded-2xl px-10 py-8 flex flex-col gap-5"
          style={{
            background: 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1.5px solid rgba(255, 255, 255, 0.55)',
            boxShadow: '0 8px 40px 0 rgba(30, 60, 120, 0.22), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}
        >
          {/* Form */}
          <form onSubmit={AdminLogin} className="flex flex-col gap-4">

            <input
              type="text"
              className="w-full h-[54px] bg-white border border-gray-300 rounded-xl px-5 text-gray-800 placeholder-gray-500 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-sm"
              placeholder="Admin Email"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                onClick={() => setShow(prev => !prev)}
              >
                {show ? <IoEye className="w-6 h-6" /> : <IoEyeOutline className="w-6 h-6" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-[54px] cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-xl font-bold text-[18px] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-xl mt-1"
            >
              {loading ? <Loading /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

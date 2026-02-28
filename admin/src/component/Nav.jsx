import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

function Nav() {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { getAdmin } = useContext(adminDataContext)

  const logOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      toast.success("Logged Out Successfully")
      getAdmin()
      navigate("/login")
    } catch (error) {
      toast.error("Logout Failed")
    }
  }

  return (
    <nav className="w-full h-16 bg-gray-50 border-b border-gray-300 shadow fixed top-0 z-20 flex items-center justify-between px-8">
      {/* Logo — matches frontend Nav.jsx */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <button
          style={{ fontFamily: 'Playfair Display' }}
          className="xl:text-4xl lg:text-3xl sm:text-3xl text-2xl text-gray-900"
        >
          Furnito
        </button>
        <span className="text-xs font-semibold text-gray-500 bg-gray-200 border border-gray-300 px-2 py-0.5 rounded-full self-end mb-1">
          Admin
        </span>
      </div>

      {/* Logout */}
      <button
        onClick={logOut}
        className="text-[14px] font-semibold bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-xl cursor-pointer transition-colors duration-200"
      >
        Log Out
      </button>
    </nav>
  )
}

export default Nav

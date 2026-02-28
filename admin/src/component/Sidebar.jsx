import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io"
import { FaRegListAlt } from "react-icons/fa"
import { SiTicktick } from "react-icons/si"
import { useNavigate, useLocation } from 'react-router-dom'

function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()

    const navItems = [
        { label: 'Add Items', icon: <IoIosAddCircleOutline className="w-5 h-5 flex-shrink-0" />, path: '/add' },
        { label: 'List Items', icon: <FaRegListAlt className="w-5 h-5 flex-shrink-0" />, path: '/lists' },
        { label: 'View Orders', icon: <SiTicktick className="w-5 h-5 flex-shrink-0" />, path: '/orders' },
    ]

    return (
        <aside className="w-[18%] min-h-screen bg-gray-300 border-r border-gray-400 shadow-md fixed left-0 top-0 pt-16 z-10">
            <div className="flex flex-col gap-1 pt-6 px-3">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold w-full text-left transition-all duration-200 cursor-pointer
                ${isActive
                                    ? 'bg-gray-800 text-white shadow'
                                    : 'text-gray-700 hover:bg-gray-400/60 hover:text-gray-900'
                                }`}
                        >
                            {item.icon}
                            <span className="hidden md:block">{item.label}</span>
                        </button>
                    )
                })}
            </div>
        </aside>
    )
}

export default Sidebar

import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { MdDeleteOutline } from "react-icons/md"
import { toast } from 'react-toastify'

function Lists() {
  const [list, setList] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
    } catch (error) {
      toast.error("Failed to load products")
    }
  }

  const removeList = async (id) => {
    try {
      const result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) fetchList()
      else toast.error("Failed to remove product")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to remove product")
    }
  }

  useEffect(() => { fetchList() }, [])

  return (
    <div className="w-full min-h-screen bg-gray-200 text-gray-900">
      <Nav />
      <Sidebar />

      <div className="ml-[18%] pt-16 px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-800 my-8" style={{ fontFamily: 'Italiana' }}>
          All Listed Products
        </h1>

        <div className="flex flex-col gap-3 max-w-3xl">
          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl transition-all"
                style={{
                  background: 'rgba(255,255,255,0.50)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1.5px solid rgba(255,255,255,0.70)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                }}
              >
                {/* Product image */}
                <img
                  src={item.image1}
                  className="w-[80px] h-[80px] rounded-xl object-cover flex-shrink-0 shadow-sm border border-gray-200"
                  alt={item.name}
                />

                {/* Info */}
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-[16px] font-semibold text-gray-800">{item.name}</p>
                  <p className="text-[14px] text-gray-500">{item.category} · {item.subCategory}</p>
                  <p className="text-[15px] font-bold text-blue-600">₹{item.price}</p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeList(item._id)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 border border-red-200 transition-all cursor-pointer"
                  title="Remove product"
                >
                  <MdDeleteOutline className="w-5 h-5" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-[16px]">No products found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Lists

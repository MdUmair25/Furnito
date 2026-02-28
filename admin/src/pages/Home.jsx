import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { FaBoxOpen } from 'react-icons/fa'
import { SiTicktick } from 'react-icons/si'

function Home() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const { serverUrl } = useContext(authDataContext)

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`)
      setTotalProducts(products.data.length)
      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
      setTotalOrders(orders.data.length)
    } catch (err) {
      setTotalProducts(0)
      setTotalOrders(0)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <div className="w-full min-h-screen bg-gray-200 text-gray-900">
      <Nav />
      <Sidebar />

      {/* Main content — offset for fixed nav + sidebar */}
      <div className="ml-[18%] pt-16 px-8 py-10">
        <h1
          className="text-3xl font-bold text-gray-800 my-8"
          style={{ fontFamily: 'Italiana' }}
        >
          Dashboard
        </h1>

        {/* Glassmorphism stat cards */}
        <div className="flex flex-wrap gap-6">

          {/* Total Products */}
          <div
            className="flex flex-col items-center justify-center gap-4 w-[280px] h-[180px] rounded-2xl p-6 cursor-default"
            style={{
              background: 'rgba(255,255,255,0.45)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255,255,255,0.65)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            }}
          >
            <div className="flex items-center gap-3 text-gray-600">
              <FaBoxOpen className="w-7 h-7 text-blue-500" />
              <span className="text-[16px] font-semibold">Total Products</span>
            </div>
            <span className="text-5xl font-bold text-gray-800">{totalProducts}</span>
          </div>

          {/* Total Orders */}
          <div
            className="flex flex-col items-center justify-center gap-4 w-[280px] h-[180px] rounded-2xl p-6 cursor-default"
            style={{
              background: 'rgba(255,255,255,0.45)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255,255,255,0.65)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            }}
          >
            <div className="flex items-center gap-3 text-gray-600">
              <SiTicktick className="w-6 h-6 text-green-500" />
              <span className="text-[16px] font-semibold">Total Orders</span>
            </div>
            <span className="text-5xl font-bold text-gray-800">{totalOrders}</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home

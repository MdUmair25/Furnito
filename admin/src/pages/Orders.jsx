import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox } from "react-icons/si"
import { toast } from 'react-toastify'

function Orders() {
  const [orders, setOrders] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      setOrders(result.data.reverse())
    } catch (error) {
      toast.error("Failed to fetch orders")
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) await fetchAllOrders()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status")
    }
  }

  useEffect(() => { fetchAllOrders() }, [])

  return (
    <div className="w-full min-h-screen bg-gray-200 text-gray-900">
      <Nav />
      <Sidebar />

      <div className="ml-[18%] pt-16 px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-800 my-8" style={{ fontFamily: 'Italiana' }}>
          All Orders
        </h1>

        <div className="flex flex-col gap-4 max-w-5xl">
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex lg:items-center items-start justify-between flex-col lg:flex-row gap-4 p-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.50)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1.5px solid rgba(255,255,255,0.70)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              }}
            >
              {/* Box Icon */}
              <div className="flex-shrink-0 bg-gray-100 border border-gray-300 rounded-xl p-3">
                <SiEbox className="w-8 h-8 text-gray-700" />
              </div>

              {/* Items + Address */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <div className="flex flex-col gap-0.5">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-[14px] font-semibold text-gray-800 truncate">
                      {item.name.toUpperCase()} × {item.quantity}
                      {item.size && <span className="ml-1 text-gray-500 font-normal">({item.size})</span>}
                      {i < order.items.length - 1 && ','}
                    </p>
                  ))}
                </div>
                <div className="text-[13px] text-gray-500 mt-1 flex flex-col gap-0.5">
                  <p className="font-medium text-gray-700">{order.address.firstName} {order.address.lastName}</p>
                  <p>{order.address.street}, {order.address.city}</p>
                  <p>{order.address.state}, {order.address.country} – {order.address.pinCode}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>

              {/* Order Meta */}
              <div className="flex flex-col gap-1 text-[13px] text-gray-600 min-w-[130px]">
                <p><span className="font-semibold">Items:</span> {order.items.length}</p>
                <p><span className="font-semibold">Method:</span> {order.paymentMethod}</p>
                <p>
                  <span className="font-semibold">Payment:</span>{' '}
                  <span className={order.payment ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
                    {order.payment ? 'Done' : 'Pending'}
                  </span>
                </p>
                <p><span className="font-semibold">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                <p className="text-[16px] font-bold text-gray-800 mt-1">₹{order.amount}</p>
              </div>

              {/* Status Selector */}
              <select
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-xl text-[14px] font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer shadow-sm min-w-[150px]"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}

          {orders.length === 0 && (
            <p className="text-gray-500 text-[16px]">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Orders

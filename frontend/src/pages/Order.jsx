import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import Footer from '../component/Footer'
import { useNavigate } from 'react-router-dom'

function Order() {
  let [orderData, setOrderData] = useState([])
  let { currency, formatPrice } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()

  const loadOrderData = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
      if (result.data) {
        let allOrdersItem = []
        result.data.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            })
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      setOrderData([])
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [])


  return (
    <div className='w-full min-h-screen bg-gray-200 text-gray-900 overflow-x-hidden'>
      <div className='w-full pt-28 pb-10 px-4 sm:px-10 lg:px-20'>
        {/* Page Header */}
        <div className='flex items-center gap-2 mb-10'>
          <h1 className='text-4xl font-bold text-gray-800 uppercase tracking-widest' style={{ fontFamily: 'italiana' }}>
            My Orders
          </h1>
          <div className='h-[2px] flex-1 bg-gray-300 ml-4 hidden sm:block'></div>
        </div>

        <div className='flex flex-col gap-6'>
          {orderData.length > 0 ? (
            orderData.map((item, index) => (
              <div
                key={index}
                className="w-full rounded-3xl transition-all overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.70)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(255,255,255,0.80)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <div className='flex flex-col md:flex-row items-center md:items-start p-6 gap-8'>
                  {/* Product Image */}
                  <div className='relative group'>
                    <img
                      src={item.image1}
                      alt={item.name}
                      className='w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-500'
                    />
                    <div className='absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg'>
                      Qty: {item.quantity}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className='flex-1 flex flex-col gap-2 text-center md:text-left'>
                    <p className='text-2xl font-bold text-gray-900 leading-tight' style={{ fontFamily: 'italiana' }}>
                      {item.name}
                    </p>

                    <div className='flex flex-wrap items-center justify-center md:justify-start gap-4 mt-1'>
                      <p className='text-xl font-black text-blue-700'>
                        {currency}{formatPrice(item.sellingPrice || item.price)}
                      </p>
                      <div className='h-4 w-[1px] bg-gray-300 hidden sm:block'></div>
                      <p className='text-sm font-bold text-gray-500 uppercase tracking-tighter'>
                        Date: <span className='text-gray-900'>{new Date(item.date).toDateString()}</span>
                      </p>
                      {item.size !== 'Default' && item.size && (
                        <>
                          <div className='h-4 w-[1px] bg-gray-300 hidden sm:block'></div>
                          <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-[11px] font-bold text-gray-500 rounded-md uppercase">
                            Size: {item.size}
                          </span>
                        </>
                      )}
                    </div>

                    <div className='mt-3 flex flex-col gap-1 items-center md:items-start'>
                      <p className='text-xs font-bold text-gray-400 uppercase tracking-widest'>Payment Information</p>
                      <div className='flex items-center gap-2'>
                        <span className='px-3 py-1 bg-white/50 border border-gray-100 rounded-full text-xs font-bold text-gray-600 shadow-sm'>
                          {item.paymentMethod.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${item.payment ? 'bg-green-50 border-green-100 text-green-600' : 'bg-orange-50 border-orange-100 text-orange-600'}`}>
                          {item.payment ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Status & Actions */}
                  <div className='flex flex-col items-center md:items-end justify-between gap-6 md:min-w-[150px]'>
                    <div className='flex items-center gap-2 bg-white/80 px-4 py-2 rounded-2xl border border-gray-100 shadow-sm'>
                      <div className={`w-2 h-2 rounded-full animate-pulse ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      <p className='text-sm font-bold text-gray-800 uppercase tracking-tight'>{item.status}</p>
                    </div>

                    <button
                      onClick={loadOrderData}
                      className='w-full md:w-auto px-8 py-3 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-2xl transition-all active:scale-95 cursor-pointer shadow-lg active:shadow-sm'
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className="p-20 text-center rounded-3xl"
              style={{
                background: 'rgba(255,255,255,0.50)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255,255,255,0.70)',
              }}
            >
              <p className="text-xl font-medium text-gray-400 font-bold uppercase tracking-widest" style={{ fontFamily: 'italiana' }}>No orders found yet</p>
              <button
                onClick={() => navigate('/shop')}
                className="mt-6 px-10 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all cursor-pointer shadow-xl"
              >
                Shop Trends
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Order

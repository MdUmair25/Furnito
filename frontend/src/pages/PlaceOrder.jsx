import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import Footer from '../component/Footer'

function PlaceOrder() {
  let [method, setMethod] = useState('cod')
  let navigate = useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)
  let [loading, setLoading] = useState(false)

  let [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true })
          if (data) {
            navigate("/order")
            setCartItem({})
          }
        } catch (error) {
          toast.error(error?.response?.data?.message || "Payment verification failed")
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }


  const onSubmitHandler = async (e) => {

    setLoading(true)
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      if (orderItems.length === 0) {
        toast.error("Cart is empty")
        setLoading(false)
        return
      }
      switch (method) {
        case 'cod':

          const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
          if (result.data) {
            setCartItem({})
            toast.success("Order Placed")
            navigate("/order")
            setLoading(false)

          } else {
            toast.error("Order Placed Error")
            setLoading(false)
          }

          break;

        case 'razorpay':
          const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true })
          if (resultRazorpay.data) {
            initPay(resultRazorpay.data)
            toast.success("Proceed to payment")
            setLoading(false)
          }

          break;

        default:
          break;

      }


    } catch (error) {
      toast.error(error?.response?.data?.message || "Order failed")
      setLoading(false)

    }
  }

  const inputStyle = "w-full h-11 rounded-xl bg-white border border-gray-300 px-4 text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium text-sm"

  return (
    <div className='w-full min-h-screen bg-gray-200 overflow-x-hidden'>
      <div className='w-full pt-16 pb-4 px-4 sm:px-10 lg:px-20'>
        <div className='flex flex-col lg:flex-row gap-10 items-start'>

          {/* Left Side: Delivery Information */}
          <div className='flex-1 w-full'>
            <div className='mb-4 text-left'>
              <h1 className='text-3xl font-bold text-gray-800 uppercase tracking-wide' style={{ fontFamily: 'italiana' }}>
                Delivery Info
              </h1>
              <div className='h-[2px] w-20 bg-gray-800/20 mt-1'></div>
            </div>

            <form onSubmit={onSubmitHandler} className='flex flex-col gap-3 p-6 rounded-3xl' style={{
              background: 'rgba(255,255,255,0.70)',
              backdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255,255,255,0.80)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}>
              <div className='flex gap-3 w-full'>
                <input type="text" placeholder='First name' className={inputStyle} required onChange={onChangeHandler} name='firstName' value={formData.firstName} />
                <input type="text" placeholder='Last name' className={inputStyle} required onChange={onChangeHandler} name='lastName' value={formData.lastName} />
              </div>

              <input type="email" placeholder='Email address' className={inputStyle} required onChange={onChangeHandler} name='email' value={formData.email} />
              <input type="text" placeholder='Street' className={inputStyle} required onChange={onChangeHandler} name='street' value={formData.street} />

              <div className='flex gap-3 w-full'>
                <input type="text" placeholder='City' className={inputStyle} required onChange={onChangeHandler} name='city' value={formData.city} />
                <input type="text" placeholder='State' className={inputStyle} required onChange={onChangeHandler} name='state' value={formData.state} />
              </div>

              <div className='flex gap-3 w-full'>
                <input type="text" placeholder='Pincode' className={inputStyle} required onChange={onChangeHandler} name='pinCode' value={formData.pinCode} />
                <input type="text" placeholder='Country' className={inputStyle} required onChange={onChangeHandler} name='country' value={formData.country} />
              </div>

              <input type="text" placeholder='Phone' className={inputStyle} required onChange={onChangeHandler} name='phone' value={formData.phone} />

              <div className='mt-4 pt-4 border-t border-gray-100/50'>
                {/* Hidden button for form submission triggered by the big button on right */}
                <button id="submitOrder" type="submit" className="hidden"></button>
              </div>
            </form>
          </div>

          {/* Right Side: Order Summary & Payment */}
          <div className='w-full lg:w-[420px] flex flex-col gap-6'>

            <div className='p-6 rounded-3xl' style={{
              background: 'rgba(255,255,255,0.80)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(255,255,255,0.90)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            }}>
              <CartTotal />

              <div className='mt-6'>
                <h3 className='text-lg font-bold text-gray-800 mb-4 uppercase tracking-widest' style={{ fontFamily: 'italiana' }}>
                  Payment Method
                </h3>

                <div className='flex flex-col gap-3'>
                  <div
                    onClick={() => setMethod('razorpay')}
                    className={`flex items-center gap-4 p-3 border-2 rounded-2xl cursor-pointer transition-all ${method === 'razorpay' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'razorpay' ? 'border-blue-600' : 'border-gray-300'}`}>
                      {method === 'razorpay' && <div className='w-2.5 h-2.5 bg-blue-600 rounded-full'></div>}
                    </div>
                    <img src={razorpay} className='h-8 object-contain' alt="Razorpay" />
                  </div>

                  <div
                    onClick={() => setMethod('cod')}
                    className={`flex items-center gap-4 p-3 border-2 rounded-2xl cursor-pointer transition-all ${method === 'cod' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'cod' ? 'border-blue-600' : 'border-gray-300'}`}>
                      {method === 'cod' && <div className='w-2.5 h-2.5 bg-blue-600 rounded-full'></div>}
                    </div>
                    <p className={`font-bold text-[13px] tracking-tight ${method === 'cod' ? 'text-blue-700' : 'text-gray-500'}`}>CASH ON DELIVERY</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => document.getElementById('submitOrder').click()}
                className='w-full mt-6 py-3.5 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-2xl shadow-xl transition-all active:scale-95 cursor-pointer uppercase tracking-widest flex items-center justify-center'
              >
                {loading ? <Loading /> : "Complete Purchase"}
              </button>

              <div className="mt-4 flex items-center gap-3 text-[11px] text-gray-400 font-bold uppercase tracking-tighter border-t border-gray-100 pt-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Encrypted & Secure Payment
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PlaceOrder

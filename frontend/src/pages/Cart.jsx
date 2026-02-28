import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';
import Footer from '../component/Footer';

function Cart() {
  const { products, currency, formatPrice, cartItem, updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className='w-full min-h-screen bg-gray-200 text-gray-900 overflow-x-hidden'>
      {/* Header section with light theme title */}
      <div className='w-full pt-28 pb-10 px-4 sm:px-10 lg:px-20'>
        <div className='flex items-center gap-2 mb-8'>
          <h1 className='text-4xl font-bold text-gray-800' style={{ fontFamily: 'italiana' }}>
            Your Cart
          </h1>
          <div className='h-[2px] flex-1 bg-gray-300 ml-4 hidden sm:block'></div>
        </div>

        <div className='flex flex-col lg:flex-row gap-10'>
          {/* Cart Items List */}
          <div className='flex-1 flex flex-col gap-4'>
            {cartData.length > 0 ? (
              cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                if (!productData) return null;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-3xl transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.70)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1.5px solid rgba(255,255,255,0.80)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    }}
                  >
                    {/* Product image */}
                    <img
                      src={productData.image1}
                      className="w-24 h-24 rounded-2xl object-cover shadow-sm border border-gray-100"
                      alt={productData.name}
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <p className="text-xl font-bold text-gray-900 truncate" style={{ fontFamily: 'italiana' }}>
                        {productData.name}
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-black text-blue-600">
                          {currency}{formatPrice(productData.sellingPrice || productData.price)}
                        </p>
                        {item.size !== 'Default' && (
                          <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-[12px] font-bold text-gray-500 rounded-md uppercase">
                            {item.size}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                        className='w-16 h-10 text-center text-gray-900 font-bold bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all'
                        onChange={(e) => (e.target.value === '' || e.target.value === '0') ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                      />

                      {/* Delete */}
                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-500 text-red-500 hover:text-white border border-red-100 transition-all cursor-pointer group"
                      >
                        <RiDeleteBin6Line className="w-5 h-5 transition-transform group-hover:scale-110" />
                      </button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div
                className="p-20 text-center rounded-3xl"
                style={{
                  background: 'rgba(255,255,255,0.50)',
                  backdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(255,255,255,0.70)',
                }}
              >
                <p className="text-xl font-medium text-gray-400">Your cart is currently empty.</p>
                <button
                  onClick={() => navigate('/shop')}
                  className="mt-6 px-10 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all cursor-pointer shadow-xl"
                >
                  Return to Shop
                </button>
              </div>
            )}
          </div>

          {/* Cart Summary Side */}
          <div className='w-full lg:w-[400px]'>
            <div
              className='p-8 rounded-3xl sticky top-24'
              style={{
                background: 'rgba(255,255,255,0.80)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(255,255,255,0.90)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              }}
            >
              <CartTotal />
              <button
                disabled={cartData.length === 0}
                className={`w-full mt-8 py-4 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-2xl shadow-2xl transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest`}
                onClick={() => navigate("/placeorder")}
              >
                Proceed to Checkout
              </button>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-[12px] text-gray-400 font-bold uppercase tracking-tighter border-t border-gray-100 pt-6">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Secure Checkout Guaranteed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart

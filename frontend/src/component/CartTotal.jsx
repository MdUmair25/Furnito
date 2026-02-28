import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'

function CartTotal() {
  const { currency, formatPrice, delivery_fee, getCartAmount } = useContext(shopDataContext)
  const amount = getCartAmount()

  return (
    <div className='w-full'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 uppercase tracking-widest' style={{ fontFamily: 'italiana' }}>
          Cart Totals
        </h2>
        <div className='w-12 h-1 bg-blue-600 mt-1'></div>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex justify-between items-center text-gray-600 font-medium'>
          <p className='text-[15px]'>Subtotal</p>
          <p className='text-lg'>{currency}{formatPrice(amount)}</p>
        </div>

        <div className='w-full h-[1px] bg-gray-200/50'></div>

        <div className='flex justify-between items-center text-gray-600 font-medium'>
          <p className='text-[15px]'>Shipping Fee</p>
          <p className='text-lg'>{currency}{formatPrice(delivery_fee)}</p>
        </div>

        <div className='w-full h-[1px] bg-gray-200'></div>

        <div className='flex justify-between items-center pt-2'>
          <b className='text-xl text-gray-900 font-bold' style={{ fontFamily: 'italiana' }}>Total Amount</b>
          <b className='text-2xl text-blue-700 font-black'>
            {currency}{formatPrice(amount === 0 ? 0 : (amount + delivery_fee))}
          </b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal

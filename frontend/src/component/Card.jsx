import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

function Card({ name, image, id, price, sellingPrice, originalPrice, discount, rating, title }) {
  const { currency, formatPrice } = useContext(shopDataContext)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/productdetail/${id}`);
    window.scrollTo(0, 0);
  }

  return (
    <div
      className="group relative cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-full overflow-hidden rounded-2xl aspect-square shadow-sm">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            -{discount}%
          </div>
        )}
      </div>
      <div className="mt-4 px-1 text-left">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-bold text-gray-900 truncate flex-1 leading-tight">{name}</h3>
          <div className="flex items-center bg-orange-50 px-2 py-0.5 rounded-md">
            <FaStar className="text-[#FFA740] text-[12px] mr-1" />
            <span className="font-bold text-gray-800 text-[13px]">{rating || "4.5"}</span>
          </div>
        </div>
        <p className="text-[13px] text-gray-400 font-medium truncate mt-0.5">{title || "Premium Collection"}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-black text-gray-900">
            {currency}{formatPrice(sellingPrice || price)}
          </span>
          {originalPrice && (
            <span className="text-sm font-medium text-gray-400 line-through">
              {currency}{formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card

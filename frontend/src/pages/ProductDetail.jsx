import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaCartPlus } from "react-icons/fa"
import RelatedProduct from '../component/RelatedProduct'
import Loading from '../component/Loading'

import Footer from '../component/Footer'

function ProductDetail() {
  const { productId } = useParams()
  const { products, currency, addtoCart, loading } = useContext(shopDataContext)
  const [productData, setProductData] = useState(null)
  const [mainImage, setMainImage] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const product = products.find(item => item._id === productId)
    if (product) {
      setProductData(product)
      setMainImage(product.image1)
    }
  }, [productId, products])

  if (!productData) {
    return <div className="min-h-screen flex items-center justify-center bg-white"><Loading /></div>
  }

  const {
    name,
    title,
    description,
    sellingPrice,
    originalPrice,
    discount,
    rating,
    ratingCount,
    image1,
    image2,
    image3,
    image4,
    category,
    subCategory,
    _id
  } = productData

  const images = [image1, image2, image3, image4].filter(Boolean)

  return (
    <main className="bg-white min-h-screen pt-4">
      {/* Product Details Section */}
      <section id="prodetails" className="flex md:flex-row flex-col justify-between gap-x-10 mx-auto px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">

        {/* Product Image Left Section */}
        <div className="md:w-1/2 flex flex-col md:flex-row gap-4">
          {/* Thumbnail Images - On left for large screens, below for mobile */}
          <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${mainImage === img ? 'border-blue-500 shadow-md' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 order-1 md:order-2">
            <img
              id="hd_image"
              className="rounded-3xl w-full aspect-square object-cover shadow-2xl"
              src={mainImage}
              alt={name}
            />
          </div>
        </div>

        {/* Product Details Right Section */}
        <div className="md:w-[45%] max-md:mt-8">
          <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-gray-900" style={{ fontFamily: 'italiana' }}>
            {name}
          </h2>
          <h4 className="lg:mt-2 md:mt-1 lg:text-xl md:text-lg text-lg text-slate-600 font-medium">
            {title}
          </h4>

          {/* Rating and Review */}
          <div className="flex gap-5 lg:mt-6 mt-4 items-center">
            <div className="bg-[#FFA740] text-white lg:px-4 lg:py-1.5 py-1 px-3 rounded-lg flex items-center gap-1 shadow-sm">
              <FaStar className="text-sm" />
              <span id="product_rating" className="font-bold md:text-base text-sm leading-none">{rating || "4.5"}</span>
            </div>
            <div>
              <p className="text-base text-black/60 font-medium" id="rating_count">
                {ratingCount || "0"} Reviews
              </p>
            </div>
          </div>

          {/* Price Section */}
          <div className="flex items-baseline gap-5 lg:my-8 my-5">
            <h2 id="product_price" className="lg:text-4xl md:text-3xl text-3xl font-black text-gray-900">
              {currency}{sellingPrice || productData.price}
            </h2>
            {originalPrice && (
              <h4 id="original_price" className="lg:text-2xl text-xl line-through text-slate-400">
                {currency}{originalPrice}
              </h4>
            )}
            {discount > 0 && (
              <h6 id="discount" className="lg:text-2xl text-xl font-bold text-red-500 bg-red-50 px-2 rounded-md">
                {discount}% OFF
              </h6>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="lg:text-xl text-lg font-bold text-gray-900 mb-2 uppercase tracking-tight">Description</h3>
            <p id="product_description" className="text-slate-600 lg:text-base md:text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Count and Cart Section */}
          <div className="flex flex-wrap items-center lg:mt-10 mt-6 gap-6">
            {/* Quantity Counter */}
            <div className="relative flex items-center w-[140px] rounded-full overflow-hidden border border-gray-200 shadow-sm h-14 bg-gray-50">
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="flex-1 h-full flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" />
                </svg>
              </button>
              <input
                type="text"
                className="w-10 text-center font-bold text-gray-900 bg-transparent border-none focus:ring-0"
                value={quantity}
                readOnly
              />
              <button
                type="button"
                onClick={() => setQuantity(prev => prev + 1)}
                className="flex-1 h-full flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v12m6-6H6" />
                </svg>
              </button>
            </div>

            {/* Add to Cart Button */}
            <div className="grad flex-1 min-w-[200px] overflow-hidden rounded-full shadow-xl hover:shadow-2xl transition-all active:scale-95">
              <button
                id="addToCartBtn"
                onClick={() => addtoCart(_id, "Default", quantity)} // Note: sizes were removed, using "Default"
                className="w-full text-white text-xl font-bold h-14 rounded-full flex items-center justify-center gap-3 cursor-pointer"
                type="button"
              >
                {loading ? <Loading /> : (
                  <>
                    <FaCartPlus />
                    Add to cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Product Section */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="mx-auto px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="xl:text-4xl sm:text-3xl text-2xl text-gray-900 font-bold mb-10" style={{ fontFamily: 'italiana' }}>
            More Like These
          </h2>
          <RelatedProduct category={category} subCategory={subCategory} currentProductId={_id} />
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default ProductDetail

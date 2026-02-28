import React, { useContext, useState, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { MdOutlineCloudUpload, MdInfoOutline, MdOutlineStarBorder } from 'react-icons/md'
import { BiSolidOffer } from 'react-icons/bi'
import { TbCategory2, TbListDetails } from 'react-icons/tb'
import { RiPriceTag3Line, RiPriceTagLine } from 'react-icons/ri'
import { HiOutlinePhoto } from 'react-icons/hi2'
import { AiOutlinePercentage } from 'react-icons/ai'

function Add() {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Chair")
  const [originalPrice, setOriginalPrice] = useState("")
  const [sellingPrice, setSellingPrice] = useState("")
  const [discount, setDiscount] = useState(0)
  const [rating, setRating] = useState("")
  const [ratingCount, setRatingCount] = useState("")
  const [bestseller, setBestSeller] = useState(false)
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)

  // Calculate discount whenever prices change
  useEffect(() => {
    if (originalPrice && sellingPrice) {
      const orig = parseFloat(originalPrice)
      const sell = parseFloat(sellingPrice)
      if (orig > 0) {
        const disc = ((orig - sell) / orig) * 100
        setDiscount(Math.round(disc))
      }
    } else {
      setDiscount(0)
    }
  }, [originalPrice, sellingPrice])

  const handleAddProduct = async (e) => {
    e.preventDefault()
    if (!image1) return toast.error("Please upload the main image")
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("title", title)
      formData.append("description", description)
      formData.append("originalPrice", originalPrice)
      formData.append("sellingPrice", sellingPrice)
      formData.append("discount", discount)
      formData.append("rating", rating)
      formData.append("ratingCount", ratingCount)
      formData.append("category", category)
      formData.append("bestseller", bestseller)

      // The backend now defaults these or ignores them, but keeping keys for multi-part consistency
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)

      await axios.post(serverUrl + "/api/product/addproduct", formData, { withCredentials: true })
      toast.success("Product successfully added to collection")

      // Reset state
      setName(""); setTitle(""); setDescription(""); setOriginalPrice(""); setSellingPrice("")
      setRating(""); setRatingCount(""); setBestSeller(false); setCategory("Chair")
      setImage1(false); setImage2(false); setImage3(false); setImage4(false)

    } catch (error) {
      toast.error(error?.response?.data?.message || "Add Product Failed")
    } finally {
      setLoading(false)
    }
  }

  const inputCls = "w-full h-[46px] bg-white/90 border border-gray-200 rounded-xl px-4 text-gray-800 placeholder-gray-400 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
  const labelCls = "text-[12px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5"

  const images = [
    { id: 'image1', state: image1, setter: setImage1, required: true, label: 'Main' },
    { id: 'image2', state: image2, setter: setImage2, required: true, label: 'Angle 2' },
    { id: 'image3', state: image3, setter: setImage3, required: true, label: 'Angle 3' },
    { id: 'image4', state: image4, setter: setImage4, required: true, label: 'Angle 4' },
  ]

  return (
    <div className="w-full min-h-screen bg-gray-200 text-gray-900 overflow-x-hidden font-sans">
      <Nav />
      <Sidebar />

      <div className="ml-[18%] pt-20 px-8 pb-12">

        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'Italiana' }}>
            Add Product
          </h1>
          <p className="text-gray-500 text-sm mt-1">Configure your new furniture item details.</p>
        </header>

        <form onSubmit={handleAddProduct} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT SIDE (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Media Card */}
            <section className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-xl shadow-gray-200/50">
              <h3 className={labelCls}><HiOutlinePhoto className="w-4 h-4 text-blue-500" /> Product Media</h3>
              <div className="mt-5 flex flex-col gap-4">
                <label htmlFor="image1" className="block w-full h-[200px] rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-400 bg-gray-50/50 transition-all cursor-pointer overflow-hidden group">
                  {image1 ? (
                    <img src={URL.createObjectURL(image1)} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Preview" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <MdOutlineCloudUpload className="w-10 h-10 mb-1" />
                      <span className="text-xs font-bold uppercase">Upload Cover</span>
                    </div>
                  )}
                  <input type="file" id="image1" hidden onChange={(e) => setImage1(e.target.files[0])} />
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {images.slice(1).map(({ id, state, setter, label }) => (
                    <label key={id} htmlFor={id} className="relative aspect-square rounded-xl border border-gray-200 bg-white hover:border-blue-400 transition-all cursor-pointer overflow-hidden group">
                      {state ? (
                        <img src={URL.createObjectURL(state)} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <MdOutlineCloudUpload className="w-5 h-5" />
                        </div>
                      )}
                      <input type="file" id={id} hidden onChange={(e) => setter(e.target.files[0])} />
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Categorization */}
            <section className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-xl shadow-gray-200/50">
              <h3 className={labelCls}><TbCategory2 className="w-4 h-4 text-blue-500" /> Category</h3>
              <div className="mt-4">
                <select className={inputCls} onChange={(e) => setCategory(e.target.value)} value={category}>
                  <option value="Chair">Chair</option>
                  <option value="Sofa">Sofa</option>
                  <option value="Bed">Bed</option>
                  <option value="Table">Table</option>
                </select>
              </div>
            </section>
          </div>

          {/* RIGHT SIDE (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Core Details Card */}
            <section className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-xl shadow-gray-200/50">
              <h3 className={labelCls}><TbListDetails className="w-4 h-4 text-blue-500" /> Basic Information</h3>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-400 ml-1">Name</label>
                  <input type="text" placeholder="e.g. Arctic Velvet" className={inputCls} onChange={(e) => setName(e.target.value)} value={name} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-400 ml-1">Title</label>
                  <input type="text" placeholder="e.g. Modern Minimalist Armchair" className={inputCls} onChange={(e) => setTitle(e.target.value)} value={title} required />
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-400 ml-1">Product Description</label>
                  <textarea placeholder="Tell your customers about the materials, design, and comfort..." className="w-full h-[120px] bg-white/90 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm resize-none" onChange={(e) => setDescription(e.target.value)} value={description} required />
                </div>
              </div>
            </section>

            {/* Pricing & Performance Card */}
            <section className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-xl shadow-gray-200/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Pricing Sub-section */}
                <div className="flex flex-col gap-5">
                  <h3 className={labelCls}><RiPriceTag3Line className="w-4 h-4 text-blue-500" /> Pricing</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-gray-400 ml-1">Original Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold pr-3">₹</span>
                        <input type="number" placeholder="0" className="w-full h-[46px] bg-white/90 border border-gray-200 rounded-xl pl-10 pr-4 text-gray-800 font-bold" onChange={(e) => setOriginalPrice(e.target.value)} value={originalPrice} required />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-gray-400 ml-1">Selling Price</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold pr-3">₹</span>
                        <input type="number" placeholder="0" className="w-full h-[46px] bg-white/90 border border-gray-200 rounded-xl pl-10 pr-4 text-gray-800 font-bold italic text-blue-600" onChange={(e) => setSellingPrice(e.target.value)} value={sellingPrice} required />
                      </div>
                    </div>
                    {/* Discount Badge */}
                    <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 p-3 rounded-2xl">
                      <AiOutlinePercentage className="w-6 h-6 text-blue-500" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Calculated Discount</p>
                        <p className="text-xl font-black text-blue-700">{discount}% OFF</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Sub-section */}
                <div className="flex flex-col gap-5">
                  <h3 className={labelCls}><MdOutlineStarBorder className="w-4 h-4 text-blue-500" /> Rating & Reviews</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-gray-400 ml-1">Rating (Out of 5)</label>
                      <input type="number" min="0" max="5" step="0.1" placeholder="4.5" className={inputCls} onChange={(e) => setRating(e.target.value)} value={rating} required />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-gray-400 ml-1">Total Review Count</label>
                      <input type="number" placeholder="1250" className={inputCls} onChange={(e) => setRatingCount(e.target.value)} value={ratingCount} required />
                    </div>

                    <div className="flex items-center gap-4 mt-2 group cursor-pointer" onClick={() => setBestSeller(prev => !prev)}>
                      <div className={`w-14 h-7 rounded-full flex items-center px-1 transition-all duration-300 ${bestseller ? 'bg-blue-600' : 'bg-gray-200'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 transform ${bestseller ? 'translate-x-7' : 'translate-x-0'}`} />
                      </div>
                      <span className={`text-[13px] font-bold ${bestseller ? 'text-blue-700' : 'text-gray-600'}`}>Exclusive Bestseller</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Action Group */}
            <div className="flex justify-end mt-4">
              <button type="submit" className="h-[56px] px-12 bg-gray-900 hover:bg-black text-white font-bold text-[16px] rounded-2xl transition-all shadow-2xl flex items-center gap-3 active:scale-95 cursor-pointer">
                {loading ? <Loading /> : "+ Publish Product"}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Add

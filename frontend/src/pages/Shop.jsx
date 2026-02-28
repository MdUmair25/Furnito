import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'
import Footer from '../component/Footer'

const filterTabs = ['All', 'Chair', 'Sofa', 'Bed', 'Table']

function Shop() {
    const { products, search, showSearch } = useContext(shopDataContext)
    const [filterProduct, setFilterProduct] = useState([])
    const [activeFilter, setActiveFilter] = useState('All')
    const [sortType, setSortType] = useState("relevant")

    const applyFilters = () => {
        let productCopy = products.slice()

        if (showSearch && search) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (activeFilter !== 'All') {
            productCopy = productCopy.filter(item => item.category === activeFilter)
        }

        // Apply Sorting
        if (sortType === 'low-high') {
            productCopy.sort((a, b) => ((a.sellingPrice || a.price) - (b.sellingPrice || b.price)))
        } else if (sortType === 'high-low') {
            productCopy.sort((a, b) => ((b.sellingPrice || b.price) - (a.sellingPrice || a.price)))
        }

        setFilterProduct(productCopy)
    }

    useEffect(() => {
        applyFilters()
    }, [products, activeFilter, search, showSearch, sortType])

    return (
        <div className='w-full min-h-screen bg-gray-200 text-gray-900 overflow-x-hidden'>
            {/* Page Container */}
            <section className="mx-auto px-4 py-20 sm:px-6 lg:max-w-7xl lg:px-8">

                {/* Header & Page Title */}
                <div className='flex flex-col md:flex-row items-center justify-between mb-12 gap-6'>
                    <div>
                        <h1 className='text-5xl font-bold text-gray-900' style={{ fontFamily: 'italiana' }}>
                            Our Shop
                        </h1>
                        <p className='text-gray-500 font-medium mt-2 uppercase tracking-[0.2em] text-xs'>Premium Furniture Boutique</p>
                    </div>

                    {/* Simple Sorting Dropdown */}
                    <div className='flex items-center gap-3 bg-white/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/80 shadow-sm'>
                        <span className='text-sm font-bold text-gray-400'>SORT BY:</span>
                        <select
                            className='bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-800 cursor-pointer outline-none'
                            onChange={(e) => setSortType(e.target.value)}
                        >
                            <option value="relevant">Relevant</option>
                            <option value="low-high">Price: Low to High</option>
                            <option value="high-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Pill-based Filter Menu (Requested Design) */}
                <div className="flex flex-wrap sm:gap-x-10 gap-x-6 gap-y-4 max-[420px]:gap-x-3 mx-auto w-full justify-center mb-16">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveFilter(tab)}
                            className={`inline-block px-8 py-2.5 max-sm:text-sm rounded-full font-bold transition-all duration-300 shadow-sm cursor-pointer ${activeFilter === tab
                                    ? 'bg-blue-600 text-white shadow-blue-200 shadow-lg scale-105'
                                    : 'bg-white/80 text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                {filterProduct.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {filterProduct.map((item, index) => (
                            <div key={index} className='animate-fadeIn' style={{ animationDelay: `${index * 50}ms` }}>
                                <Card
                                    id={item._id}
                                    name={item.name}
                                    price={item.price}
                                    sellingPrice={item.sellingPrice}
                                    image={item.image1}
                                    originalPrice={item.originalPrice}
                                    discount={item.discount}
                                    rating={item.rating}
                                    title={item.title}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='w-full py-20 text-center'>
                        <p className='text-gray-400 text-xl font-bold uppercase tracking-widest' style={{ fontFamily: 'italiana' }}>
                            No items found in this category
                        </p>
                    </div>
                )}
            </section>

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease forwards;
                }
            `}} />
        </div>
    )
}

export default Shop

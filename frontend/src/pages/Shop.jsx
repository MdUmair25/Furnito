import React, { useContext, useEffect, useRef, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'
import Footer from '../component/Footer'

const filterTabs = ['All', 'Chair', 'Sofa', 'Bed', 'Table']
const sortOptions = [
    { value: "relevant", label: "Relevant" },
    { value: "low-high", label: "Price: Low to High" },
    { value: "high-low", label: "Price: High to Low" }
]

const stableHash = (value) => {
    let hash = 2166136261
    const str = String(value || "")
    for (let i = 0; i < str.length; i += 1) {
        hash ^= str.charCodeAt(i)
        hash = Math.imul(hash, 16777619)
    }
    return hash >>> 0
}

function Shop() {
    const { products, search, showSearch } = useContext(shopDataContext)
    const [filterProduct, setFilterProduct] = useState([])
    const [activeFilter, setActiveFilter] = useState('All')
    const [sortType, setSortType] = useState("relevant")
    const [isSortOpen, setIsSortOpen] = useState(false)
    const sortDropdownRef = useRef(null)

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
        } else if (activeFilter === 'All') {
            // Stable pseudo-random order for "Relevant" in All tab.
            productCopy.sort((a, b) => stableHash(a._id) - stableHash(b._id))
        }

        setFilterProduct(productCopy)
    }

    useEffect(() => {
        applyFilters()
    }, [products, activeFilter, search, showSearch, sortType])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setIsSortOpen(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick)
        return () => document.removeEventListener("mousedown", handleOutsideClick)
    }, [])

    const selectedSortLabel = sortOptions.find((item) => item.value === sortType)?.label || "Relevant"

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
                        <div className='relative min-w-[190px]' ref={sortDropdownRef}>
                            <button
                                type='button'
                                className={`w-full h-10 bg-white/80 border border-gray-200 rounded-xl px-3 text-sm font-bold text-gray-800 flex items-center justify-between cursor-pointer shadow-sm transition-all ${isSortOpen ? "ring-2 ring-blue-500/20 border-blue-500" : ""}`}
                                onClick={() => setIsSortOpen((prev) => !prev)}
                            >
                                <span>{selectedSortLabel}</span>
                                <span className={`text-gray-500 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}>
                                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.12l3.71-3.89a.75.75 0 1 1 1.08 1.04l-4.25 4.46a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </button>

                            {isSortOpen && (
                                <div className="absolute top-[44px] left-0 w-full z-30 overflow-hidden rounded-2xl border border-blue-100 bg-white/95 backdrop-blur-xl shadow-xl shadow-blue-100/40">
                                    {sortOptions.map((item) => (
                                        <button
                                            key={item.value}
                                            type="button"
                                            onClick={() => {
                                                setSortType(item.value)
                                                setIsSortOpen(false)
                                            }}
                                            className={`w-full text-left px-4 py-3 text-[14px] font-semibold transition-colors ${sortType === item.value ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-50"}`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
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

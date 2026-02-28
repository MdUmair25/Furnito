import React, { useContext, useMemo, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';

const filterTabs = ['All', 'Chair', 'Sofa', 'Bed', 'Table'];

function LatestCollection() {
  const { products } = useContext(shopDataContext);
  const [activeFilter, setActiveFilter] = useState('All');

  const latestProducts = useMemo(() => products.slice(0, 8), [products]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All') return latestProducts;
    return latestProducts.filter((item) => item.category === activeFilter);
  }, [activeFilter, latestProducts]);

  return (
    <div className="bg-white w-full">
      <div id="trending" className="mx-auto px-4 pt-4 pb-16 sm:pt-24 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="xl:text-4xl sm:text-3xl text-2xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'italiana' }}>
            Trending Furniture <br className="hidden sm:block" /> For Your Home
          </h2>
          <Link
            to="/shop"
            id="all_products"
            className="text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-bold rounded-full sm:text-base text-sm px-6 py-3 transition-all flex items-center gap-2 shadow-lg"
          >
            <span className="sm:inline hidden">All Products</span>
            <span className="sm:hidden">All</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div id="items_filter" className="flex flex-wrap sm:gap-12 gap-6 my-10">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              className={`text-[15px] font-bold tracking-wider uppercase transition-all pb-1 border-b-2 cursor-pointer ${activeFilter === tab
                ? 'text-gray-900 border-gray-900'
                : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div
          id="proDiv"
          className="grid gap-x-6 lg:gap-y-12 gap-y-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8"
        >
          {filteredProducts.map((item) => (
            <Card
              key={item._id}
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default LatestCollection;

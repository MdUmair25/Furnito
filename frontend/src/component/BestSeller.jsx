import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';

function BestSeller() {
  const { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const filterProduct = products.filter((item) => item.bestseller);
    setBestSeller(filterProduct.slice(0, 4));
  }, [products]);

  if (bestSeller.length === 0) return null;

  return (
    <div className="bg-white w-full">
      <div id="best-seller" className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="xl:text-4xl sm:text-3xl text-2xl text-gray-900 font-bold mb-10" style={{ fontFamily: 'italiana' }}>
          Our Best Selling <br /> Products
        </h2>

        <div id="bestSelDiv" className="grid gap-x-6 lg:gap-y-12 gap-y-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {bestSeller.map((item) => (
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

export default BestSeller;

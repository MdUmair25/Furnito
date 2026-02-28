import React, { useEffect } from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import SuperSale from '../component/SuperSale'
import Footer from '../component/Footer'

function Product() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='w-full min-h-screen bg-gray-200 text-gray-900 overflow-x-hidden'>
      <div className='w-full flex flex-col gap-0'>
        <LatestCollection />
        <SuperSale />
        <BestSeller />
      </div>
    </div>
  )
}

export default Product

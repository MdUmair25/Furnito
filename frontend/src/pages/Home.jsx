import React from 'react'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import Reviews from '../component/Reviews'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'


function Home() {
  return (
    <div className='overflow-x-hidden'>
      <div className=' w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh]   bg-gradient-to-l from-[#141414] to-[#0c2025] '>
        <Hero />
      </div>
      <Product />
      <Reviews />
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home

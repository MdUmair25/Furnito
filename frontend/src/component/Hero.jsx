import React, { useState } from 'react';
import herobg1 from '../assets/herobg1.jpg';
import herobg2 from '../assets/herobg2.webp';
import herobg3 from '../assets/herobg3.webp';

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      <div className="relative h-[70vh] sm:h-screen overflow-hidden rounded-lg">
        <div
          className={`${activeSlide === 0 ? 'block' : 'hidden'} duration-700 ease-in-out h-full w-full bg-cover bg-center`}
          style={{ backgroundImage: `url('${herobg1}')` }}
          data-carousel-item="active"
        >
          <div className="absolute z-20 top-[28%] w-full">
            <p className="xl:text-xl lg:text-lg text-gray-800 text-center">
              Elevate Your Space with
            </p>
            <h1 className="capitalize mt-5 xl:text-7xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl text-black text-center font-bold -tracking-tight vonique">
              Luxury &amp; Comfort
            </h1>
          </div>
        </div>

        <div
          className={`${activeSlide === 1 ? 'block' : 'hidden'} duration-700 ease-in-out h-full w-full bg-cover bg-center`}
          style={{ backgroundImage: `url('${herobg2}')` }}
          data-carousel-item
        >
          <div className="absolute z-20 sm:top-[28%] top-[40%] w-full text-center">
            <h1
              className="capitalize xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl text-black z-40 text-center font-bold -tracking-tight leading-snug"
              style={{ fontFamily: 'italiana' }}
            >
              Discover your perfect <br />
              space
            </h1>
          </div>
        </div>

        <div
          className={`${activeSlide === 2 ? 'block' : 'hidden'} duration-700 ease-in-out h-full w-full bg-cover bg-center`}
          style={{ backgroundImage: `url('${herobg3}')` }}
          data-carousel-item
        >
          <div className="absolute z-20 sm:top-[25%] top-[30%] w-full text-center">
            <h1
              className="xl:text-9xl lg:text-8xl md:text-7xl sm:text-6xl text-7xl text-[#000000] z-40 text-center font-bold"
              style={{ fontFamily: 'italiana' }}
            >
              Discover <br />
              <span className="text-[#53A12C]" style={{ fontFamily: 'Italianno' }}>
                The best
              </span>
              <br />
              <span className="text-[#022601]">Furniture</span>
            </h1>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

export default Hero;

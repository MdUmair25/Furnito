import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import profile01 from '../assets/profile01.webp';
import profile02 from '../assets/profile02.webp';
import profile03 from '../assets/profile03.webp';
import profile04 from '../assets/profile04.webp';

const reviews = [
  {
    image: profile01,
    name: 'Ayesha Khan',
    role: 'Interior Stylist',
    text: 'Absolutely love the finish and comfort. My bedroom setup feels premium now.',
  },
  {
    image: profile02,
    name: 'Rahul Mehta',
    role: 'Architect',
    text: 'Great build quality and fast delivery. The sofa was exactly as shown in photos.',
  },
  {
    image: profile03,
    name: 'Sara Ali',
    role: 'Home Decor Blogger',
    text: 'The detailing is beautiful and the color matched perfectly with my living room theme.',
  },
  {
    image: profile04,
    name: 'Arjun Verma',
    role: 'Software Engineer',
    text: 'Easy ordering, secure packaging, and a very sturdy table. Highly recommended.',
  },
];

function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div id="default-carousel" className="relative w-full bg-gray-100 pt-10 px-4" data-carousel="static">
      <div className="mx-auto flex justify-between items-center lg:max-w-4xl md:max-w-3xl sm:max-w-xl max-sm:max-w-sm max-w-lg px-4">
        <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-medium text-gray-900 lg:max-w-md md:max-w-sm sm:max-w-xs max-w-48">
          Our Clients' Beautiful Words For Furnito
        </h2>
        <div className="flex items-baseline sm:gap-4 gap-3">
          <button
            type="button"
            className="flex justify-center items-center cursor-pointer group focus:outline-none bg-black md:px-5 md:h-10 sm:px-4 sm:h-9 max-sm:px-3 max-sm:h-8 rounded-full"
            data-carousel-prev
            onClick={showPrev}
          >
            <span className="text-white hover:text-gray-300 dark:hover:text-white group-focus:text-gray-200 dark:group-focus:text-white">
              <svg className="rtl:rotate-180 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="flex justify-center items-center cursor-pointer group focus:outline-none bg-black md:px-5 md:h-10 sm:px-4 sm:h-9 max-sm:px-3 max-sm:h-8 rounded-full"
            data-carousel-next
            onClick={showNext}
          >
            <span className="text-white hover:text-gray-300 dark:hover:text-white group-focus:text-gray-200 dark:group-focus:text-white">
              <svg className="rtl:rotate-180 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>

      <div className="relative h-[550px] md:h-[500px] sm:h-[400px] overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {reviews.map((review, index) => (
            <div key={review.image} className="w-full flex-shrink-0" data-carousel-item>
              <section className="h-full flex items-center">
                <div className="lg:max-w-4xl md:max-w-3xl sm:max-w-xl max-w-lg lg:h-[380px] md:h-[320px] sm:h-[260px] max-sm:max-w-sm rounded-3xl flex items-center mx-auto max-sm:flex-col grad shadow-2xl">
                  <div className="w-1/2 flex justify-end max-sm:w-full max-sm:justify-center max-sm:mt-5">
                    <img
                      className="lg:h-[450px] md:h-[400px] sm:h-[320px] object-cover object-top sm:rounded-3xl max-sm:h-60 rounded-full aspect-square sm:aspect-[3/4] shadow-lg transform -translate-y-4"
                      src={review.image}
                      loading="lazy"
                      alt=""
                    />
                  </div>
                  <div className="w-1/2 text-white lg:px-16 md:px-8 sm:px-5 px-3 max-sm:w-full max-sm:p-5">
                    <h2 className="lg:text-3xl md:text-2xl sm:text-xl text-xl font-bold">{review.name}</h2>
                    <h3 className="lg:text-2xl md:text-xl sm:text-lg text-gray-400 font-medium">{review.role}</h3>
                    <p className="lg:text-xl lg:my-8 md:text-base text-base sm:my-5 my-4 italic opacity-90">"{review.text}"</p>
                    <p className="font-semibold">
                      <span className="text-lg align-middle inline-flex items-center bg-white/20 px-3 py-1 rounded-full">
                        <FaStar className="text-[#FFA740] mr-1 text-base" />4.5
                      </span>
                    </p>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;

import React from 'react';
import herobg5 from '../assets/herobg5.webp';

function NewLetterBox() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="bg-white">
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 bg-gray-200 rounded-3xl xl:py-10 xl:px-20 md:py-10 md:px-16 sm:px-12 py-10 px-6 shadow-xl">
          <div className="lg:mb-0 mb-5">
            <h2 className="text-4xl leading-snug">Stay Updated</h2>
            <p className="text-xl text-gray-500 mt-6 lg:max-w-md">
              sign up for our newsletter to receive exclusive deals, new arrivals, and interior design tips
            </p>

            <form
              onSubmit={handleSubmit}
              className="rounded-full w-fit h-14 lg:flex justify-between mt-10 shadow-inner bg-gray-50 hidden"
            >
              <input
                className="border-none bg-transparent px-7 w-60 focus:ring-0"
                type="email"
                placeholder="enter your email"
                required
              />
              <button
                className="bg-black text-white h-full w-32 rounded-full placeholder:text-black/75 text-lg font-medium"
                type="submit"
              >
                subscribe
              </button>
            </form>
          </div>

          <div className="overflow-auto">
            <img
              className="xl:aspect-[18/9] lg:aspect-[16/8] aspect-[18/9] object-cover w-full brightness-110 rounded-3xl"
              src={herobg5}
              alt=""
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-full lg:w-fit sm:h-14 h-12 lg:hidden justify-between mt-10 shadow-inner bg-gray-50 flex"
          >
            <input
              className="border-none bg-transparent px-7 lg:w-60 w-full focus:ring-0"
              type="email"
              placeholder="enter your email"
              required
            />
            <button
              className="bg-black text-white h-full lg:w-32 sm:w-40 w-32 rounded-full placeholder:text-black/75 sm:text-lg text-sm font-medium"
              type="submit"
            >
              subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewLetterBox;

import React, { useEffect, useMemo, useState } from 'react';
import { FaRegClock } from 'react-icons/fa';
import saleImage from '../assets/s_sale.webp';

function SuperSale() {
  const targetTime = useMemo(() => Date.now() + (5 * 24 * 60 * 60 + 14 * 60 * 60 + 20 * 60 + 30) * 1000, []);

  const getTimeLeft = () => {
    const diff = Math.max(0, targetTime - Date.now());

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const format = (value) => String(value).padStart(2, '0');

  return (
    <section className="bg-gray-100 w-full">
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 bg-white rounded-3xl xl:py-10 xl:px-20 md:py-10 md:px-16 sm:px-12 py-10 px-6 shadow-xl">
          <div>
            <div className="lg:block md:flex justify-between lg:mb-0 mb-5">
              <div>
                <h2 className="lg:text-5xl text-4xl font-bold leading-snug align-top text-gray-900" style={{ fontFamily: 'italiana' }}>Super Sale!</h2>
                <p className="lg:text-xl text-xl text-gray-500">Get 50% off Limited Time offer!</p>
              </div>

              <div>
                <button className="text-white bg-black cursor-default px-2 py-1 rounded-full lg:mt-5 md:mt-0 mt-5 lg:text-xs md:text-sm" type="button">
                  <FaRegClock className="inline mr-1" />
                  <span>end time</span>
                </button>

                <div className="countdown lg:text-3xl text-2xl mt-3">
                  <span id="days">{format(timeLeft.days)}d :</span>{' '}
                  <span id="hours">{format(timeLeft.hours)}h :</span>{' '}
                  <span id="minutes">{format(timeLeft.minutes)}m :</span>{' '}
                  <span id="seconds">{format(timeLeft.seconds)}s</span>
                </div>
              </div>
            </div>
            <button id="sale" className="bg-black text-white text-lg px-4 py-2 rounded-full mt-6 hidden lg:block" type="button">
              Shop Now
            </button>
          </div>

          <div className="overflow-hidden">
            <img
              className="xl:aspect-[18/9] lg:aspect-[16/9] aspect-[18/8] object-cover object-center w-full rounded-3xl"
              src={saleImage}
              loading="lazy"
              alt=""
            />
          </div>

          <div className="lg:hidden md:block mt-6">
            <button className="bg-black text-white text-lg px-4 py-2 rounded-full w-36" type="button">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SuperSale;

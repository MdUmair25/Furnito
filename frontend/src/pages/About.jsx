import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import lscBg from '../assets/lsc_bg.webp';
import about01 from '../assets/about01.webp';
import about02 from '../assets/about02.webp';
import Footer from '../component/Footer';

function About() {
  return (
    <>
      <header className="relative w-full">
        <img src={lscBg} alt="" className="w-full h-[55vh] object-cover object-center" />
        <div className="absolute top-1/3 w-full text-center text-white">
          <h1
            className="xl:text-8xl md:text-7xl sm:text-6xl text-5xl font-semibold drop-shadow-xl max-[500px]:text-4xl"
            style={{ fontFamily: 'italiana' }}
          >
            Welcome to Furnito
          </h1>
          <p className="md:text-lg sm:text-base text-xs font-medium">
            Furniture That Completes Your Home and Reflects Your Style
          </p>
        </div>
      </header>

      <main id="section08">
        <section className="mx-auto px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 bg-white">
          <div className="max-w-6xl text-black mx-auto">
            <h1 className="lg:text-5xl sm:text-4xl text-3xl font-bold" style={{ fontFamily: 'italiana' }}>
              About Us
            </h1>
            <p className="md:mt-5 sm:mt-3 mt-2 md:text-lg sm:text-base">
              Welcome to <b>Furnito</b>, your destination for furniture that elevates your home and lifestyle. At Furnito, we
              believe your furniture is more than just functional-it's an expression of your personality, a reflection of your
              style, and a key part of the memories you create every day.
            </p>

            <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 lg:gap-10 gap-5 bg-gray-100 shadow-xl drop-shadow-xl items-center rounded-3xl lg:px-16 lg:py-10 p-6">
              <div>
                <h2 className="md:text-3xl text-2xl font-bold" style={{ fontFamily: 'italiana' }}>
                  Who We Are
                </h2>
                <p className="md:mt-4 mt-2 xl:text-xl md:text-lg">
                  Furnito was born from a simple idea: to make high-quality, stylish furniture accessible to everyone. Our
                  journey began with a focus on four essential categories-Chairs, Sofas, Beds, and Tables. Over time, our
                  passion for innovation and design has driven us to constantly expand and enhance our offerings.
                </p>
              </div>
              <div>
                <img className="rounded-xl aspect-[18/9]" src={about01} alt="" />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 lg:gap-10 gap-5 bg-gray-100 shadow-xl drop-shadow-xl items-center rounded-3xl lg:px-16 lg:py-10 p-6">
              <div className="lg:order-1 order-2">
                <img className="rounded-xl object-fill shadow-lg aspect-[18/9]" src={about02} alt="" />
              </div>
              <div className="lg:order-2 order-1">
                <h2 className="md:text-3xl text-2xl font-bold" style={{ fontFamily: 'italiana' }}>
                  Our Vision
                </h2>
                <p className="md:mt-4 mt-2 xl:text-xl md:text-lg">
                  At Furnito, we dream big. Our vision is to become the go-to brand for all your furniture needs by offering a
                  diverse range of products that balance elegance, comfort, and functionality. As we grow, we aim to bring more
                  exciting categories and designs to our collection, keeping up with the latest trends and your evolving tastes.
                </p>
              </div>
            </div>

            <div>
              <h2 className="mt-20 md:text-3xl text-2xl font-bold" style={{ fontFamily: 'italiana' }}>
                What makes us different ?
              </h2>
              <ul className="mt-5 list-disc list-inside">
                <li className="mb-3">
                  <span className="font-medium">Timeless Design:</span> Our pieces are crafted to blend seamlessly with any
                  decor style.
                </li>
                <li className="mb-3">
                  <span className="font-medium">Uncompromising Quality:</span> Every item is made to last, ensuring you get the
                  best value.
                </li>
                <li className="mb-3">
                  <span className="font-medium">Customer-Centric Approach:</span> We're here to listen, support, and inspire you
                  every step of the way.
                </li>
                <li className="mb-3">
                  <span className="font-medium">Affordable Elegance:</span> Luxury doesn't have to come with a hefty price tag.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="md:text-3xl text-2xl font-bold mt-10" style={{ fontFamily: 'italiana' }}>
                Let's Build Your Dream Home
              </h2>
              <p className="mt-4">
                Furnito is more than just a furniture store-it's a community of home enthusiasts who share a love for beautiful
                spaces. We're excited to be part of your journey as you transform your house into a home that reflects your
                unique identity.
              </p>
              <p className="mt-4">
                Thank you for making us a part of your story. Let's create something extraordinary together!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 lg:gap-10 gap-5 bg-gray-100 shadow-xl drop-shadow-xl items-center rounded-3xl lg:px-16 lg:py-10 p-6">
              <div>
                <h2 className="md:text-3xl text-2xl font-bold" style={{ fontFamily: 'italiana' }}>
                  Ready to Transform <br /> you space
                </h2>
                <p className="mt-4 mb-8 text-xl">Explore our collection and find the perfect furniture for your home.</p>
                <a className="bg-black text-white px-4 py-3 rounded-full font-semibold sm:text-lg inline-flex items-center gap-2" href="/shop">
                  Browse Our Products <FaArrowRight />
                </a>
              </div>
              <div>
                <img className="rounded-xl aspect-[18/9]" src={about01} alt="" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;

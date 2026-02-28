import React from 'react';
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="bg-gray-100">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <div className="mb-10">
            <a style={{ fontFamily: 'Playfair Display' }} className="text-5xl" href="#">
              Furnito
            </a>
            <p className="mt-5 leading-normal text-lg max-w-sm">
              Specializes In Providing High-Quality, Stylish Products For Your Home
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.instagram.com/md_.umair/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-gray-400 text-black hover:text-white duration-300 text-2xl rounded-full flex justify-center items-center"
              >
                <FaInstagram />
              </a>
              <a
                href="https://in.pinterest.com/mohammadumair2504/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-gray-400 text-black hover:text-white duration-300 text-2xl rounded-full flex justify-center items-center"
              >
                <FaPinterestP />
              </a>
              <a
                href="https://www.facebook.com/mohammad.umair.92372"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-gray-400 text-black hover:text-white duration-300 text-2xl rounded-full flex justify-center items-center"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/md__umair"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-gray-400 text-black hover:text-white duration-300 text-2xl rounded-full flex justify-center items-center"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className="footer border-t-2 border-slate-300 flex justify-between items-baseline sm:text-base text-sm gap-4">
          <h2 className="mt-10">© 2026 All Right Reserves Furnish</h2>
          <a href="https://github.com/MdUmair25">
            Design By <span className="font-semibold">Mohammad Umair</span>
          </a>
        </div>
      </section>
    </footer>
  );
}

export default Footer;

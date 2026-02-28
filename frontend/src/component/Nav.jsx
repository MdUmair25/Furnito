import { useContext, useEffect, useRef, useState } from "react";
import { IoBagHandle } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { FaShop, FaHeadset } from "react-icons/fa6";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";
import { shopDataContext } from "../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileDropdownRef = useRef(null);
  const mobileUserMenuRef = useRef(null);

  const { getCurrentUser, userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { search, setSearch, getCartCount } = useContext(shopDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }

      if (mobileUserMenuRef.current && !mobileUserMenuRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const goTo = (path) => {
    navigate(path);
    setShowProfile(false);
    setIsDrawerOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      await getCurrentUser();
      navigate("/login");
      setShowProfile(false);
      setIsDrawerOpen(false);
    } catch (error) {
      // no-op
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="grid sm:grid-cols-3 grid-cols-2 items-center xl:px-20 lg:px-6 px-8 h-16 bg-gray-50 border-b border-gray-300 shadow">
        {/* Logo */}
        <div>
          <button
            onClick={() => goTo("/")}
            style={{ fontFamily: "Playfair Display" }}
            className="xl:text-4xl lg:text-3xl sm:text-3xl text-2xl"
          >
            Furnito
          </button>
        </div>

        {/* Desktop Links */}
        <div className="lg:flex items-center xl:text-lg lg:text-base justify-center xl:gap-12 lg:gap-8 hidden">
          <button onClick={() => goTo("/")} className="group font-semibold relative">
            Home
            <span className="absolute left-0 bottom-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>

          <button onClick={() => goTo("/shop")} className="group font-semibold relative">
            Shop
            <span className="absolute left-0 bottom-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>

          <button onClick={() => goTo("/about")} className="group font-semibold relative">
            About
            <span className="absolute left-0 bottom-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>

          <button onClick={() => goTo("/contact")} className="group font-semibold relative">
            Contact
            <span className="absolute left-0 bottom-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
        </div>

        {/* Desktop Right */}
        <div className="sm:flex items-center justify-end hidden gap-3">
          {/* Search */}
          <div className="flex items-center rounded-xl border border-black px-2 py-2">
            <RiSearchLine className="text-2xl cursor-pointer" onClick={() => goTo("/shop")} />
            <input
              className="bg-transparent focus:ring-0 focus: outline-none border-none placeholder:text-black/80 xl:w-40 lg:w-36 pl-2"
              type="search"
              placeholder="Search here..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                navigate("/shop");
              }}
            />
          </div>

          {/* User */}
          <div ref={profileDropdownRef} className="relative bg-gray-200 rounded-xl items-center justify-center w-10 h-10 shadow hidden lg:flex">
            {!userData && <LuUserRound className="text-2xl cursor-pointer" onClick={() => setShowProfile((prev) => !prev)} />}
            {userData && (
              <p className="text-xl font-semibold cursor-pointer" onClick={() => setShowProfile((prev) => !prev)}>
                {userData?.name?.slice(0, 1)}
              </p>
            )}

            {showProfile && (
              <div className="absolute w-[220px] bg-gray-200 top-[55px] right-0 border border-gray-300 rounded-xl z-20">
                <ul className="flex flex-col py-2.5">
                  {userData && <li className="px-4 py-2 border-b border-gray-300">{userData?.name}</li>}

                  <li className="hover:bg-white px-4 py-2 cursor-pointer" onClick={() => goTo("/order")}>
                    Orders
                  </li>

                  {!userData && (
                    <li className="hover:bg-white px-4 py-2 cursor-pointer" onClick={() => goTo("/login")}>
                      Login
                    </li>
                  )}

                  {userData && (
                    <li className="hover:bg-white px-4 py-2 cursor-pointer" onClick={handleLogout}>
                      Logout
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="relative bg-gray-200 rounded-xl items-center justify-center w-10 h-10 shadow hidden lg:flex">
            <IoBagHandle className="text-2xl cursor-pointer" onClick={() => goTo("/cart")} />
            <p className="absolute flex items-center justify-center bg-gray-500 text-white rounded-full text-[10px] w-4 h-4 top-[-4px] right-[-5px]">
              {getCartCount()}
            </p>
          </div>
        </div>

        {/* Mobile buttons */}
        <div className="lg:hidden flex items-center justify-end gap-4">
          <div className="relative bg-gray-200 rounded-xl flex items-center justify-center w-10 h-10 shadow">
            <IoBagHandle className="text-2xl cursor-pointer" onClick={() => goTo("/cart")} />
            <p className="absolute flex items-center justify-center bg-gray-500 text-white rounded-full text-[10px] w-4 h-4 top-[-4px] right-[-5px]">
              {getCartCount()}
            </p>
          </div>
          <FiMenu className="text-2xl cursor-pointer" onClick={() => setIsDrawerOpen(true)} />
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white/50 backdrop-blur w-64 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <h5 style={{ fontFamily: "Playfair Display" }} className="text-3xl">
          Furnito
        </h5>

        <button onClick={() => setIsDrawerOpen(false)} className="absolute top-[18px] right-2.5">
          <IoClose className="text-2xl" />
        </button>

        <div className="py-4">
          <ul className="space-y-2 font-medium">
            {/* Search (Mobile) */}
            <div className="flex items-center rounded-full border border-black sm:hidden px-2 py-2">
              <RiSearchLine className="text-2xl" />
              <input
                className="bg-transparent border-none w-full"
                type="search"
                placeholder="Search here..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  navigate("/shop");
                }}
              />
            </div>

            <li>
              <button className="flex items-center p-2 hover:bg-gray-100 rounded-lg w-full" onClick={() => goTo("/")}>
                <IoHomeSharp className="text-[22px]" />
                <span className="ms-3">Home</span>
              </button>
            </li>

            <li>
              <button className="flex items-center p-2 hover:bg-gray-100 rounded-lg w-full" onClick={() => goTo("/shop")}>
                <FaShop className="text-[20px]" />
                <span className="ms-3">Shop</span>
              </button>
            </li>

            <li>
              <button className="flex items-center p-2 hover:bg-gray-100 rounded-lg w-full" onClick={() => goTo("/about")}>
                <BsFillInfoCircleFill className="text-[20px]" />
                <span className="ms-3">About</span>
              </button>
            </li>

            <li>
              <button className="flex items-center p-2 hover:bg-gray-100 rounded-lg w-full" onClick={() => goTo("/contact")}>
                <FaHeadset className="text-[20px]" />
                <span className="ms-3">Contact</span>
              </button>
            </li>

            <li ref={mobileUserMenuRef}>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
                aria-controls="authorise_sm"
                onClick={() => setIsUserDropdownOpen((prev) => !prev)}
              >
                <AiOutlineUser className="text-[20px]" />
                <span className="flex-1 ms-3 text-left whitespace-nowrap">User</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <ul id="authorise_sm" className={`${isUserDropdownOpen ? "block" : "hidden"} py-2 space-y-2`}>
                {userData && (
                  <li>
                    <button
                      className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      {userData?.name}
                    </button>
                  </li>
                )}

                <li>
                  <button
                    className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100"
                    onClick={() => goTo("/order")}
                  >
                    Orders
                  </button>
                </li>

                {!userData && (
                  <li>
                    <button
                      className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100"
                      onClick={() => goTo("/login")}
                    >
                      Log in
                    </button>
                  </li>
                )}

                {userData && (
                  <li>
                    <button
                      className="flex items-center w-full p-2 text-gray-900 rounded-lg pl-11 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

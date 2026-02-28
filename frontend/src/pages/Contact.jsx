import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import lsc_bg from '../assets/lsc_bg.webp'
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiSend } from "react-icons/fi"
import { toast } from 'react-toastify'
import Footer from '../component/Footer'

function Contact() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success("Message sent successfully! We'll get back to you soon.")
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    })
  }

  return (
    <div
      className="w-full min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${lsc_bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Content Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">

        {/* Heading outside card */}
        <div className="text-center mb-8 flex flex-col items-center gap-3">
          <div
            className="px-8 py-2 rounded-full"
            style={{
              background: 'rgba(0,0,0,0.28)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            <h2
              className="text-5xl font-bold text-blue-200"
              style={{ fontFamily: '"Italiana", serif' }}
            >
              Contact Us
            </h2>
          </div>
        </div>

        {/* Contact Card */}
        <div
          className="w-full max-w-[650px] rounded-3xl p-10 flex flex-col gap-6"
          style={{
            background: 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1.5px solid rgba(255, 255, 255, 0.55)',
            boxShadow: '0 8px 40px 0 rgba(30, 60, 120, 0.22), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-2" style={{ fontFamily: 'italiana' }}>
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name Row */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <FiUser className="w-5 h-5" />
                </span>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  className="w-full h-14 pl-12 pr-5 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-medium transition-all shadow-sm"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <FiUser className="w-5 h-5" />
                </span>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="w-full h-14 pl-12 pr-5 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-medium transition-all shadow-sm"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <FiMail className="w-5 h-5" />
              </span>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="w-full h-14 pl-12 pr-5 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-medium transition-all shadow-sm"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <FiPhone className="w-5 h-5" />
              </span>
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                className="w-full h-14 pl-12 pr-5 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-medium transition-all shadow-sm"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Message */}
            <div className="relative">
              <span className="absolute left-4 top-5 text-gray-500">
                <FiMessageSquare className="w-5 h-5" />
              </span>
              <textarea
                name="message"
                placeholder="How can we help you?"
                rows="4"
                className="w-full p-4 pl-12 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-medium transition-all shadow-sm resize-none"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-14 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <FiSend className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact

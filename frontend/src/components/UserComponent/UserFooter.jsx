import React from 'react'
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='flex flex-col gap-16 px-6 md:px-16 py-16 bg-[#1e293b] text-slate-200'>
      
      {/* Top Section: Newsletter */}
      <div className='max-w-4xl mx-auto w-full text-center space-y-8'>
        <div className='space-y-2'>
          <h2 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
            Sign Up For Exclusive Offers
          </h2>
          <p className='text-slate-400 text-sm md:text-base'>
            Stay updated with our latest luxury deals and seasonal packages.
          </p>
        </div>

        <div className='flex items-center justify-center max-w-lg mx-auto w-full group'>
          <input 
            type="email" 
            placeholder='Enter Your Email Address'
            className='grow px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-l-xl outline-none text-sm focus:border-blue-400 transition-all placeholder:text-slate-500'
          />
          <button className='bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-r-xl font-bold text-sm transition-colors duration-300 shadow-lg shadow-blue-900/20'>
            Join Now
          </button>
        </div>
      </div>

      {/* Middle Section: Brand & Links */}
      <div className='flex flex-col md:flex-row justify-between items-center gap-10 border-t border-slate-800 pt-12'>
        
        {/* LEFT SIDE: Brand Identity */}
        <div className='flex flex-col items-center md:items-start gap-4'>
          <h2 className='text-2xl font-black text-white tracking-tighter'>
            LUXE<span className='text-blue-500'>HOTEL</span>
          </h2>
          <div className='flex gap-5'>
            <FaFacebook className='text-xl cursor-pointer hover:text-blue-500 transition-all transform hover:-translate-y-1' />
            <FaInstagram className='text-xl cursor-pointer hover:text-pink-500 transition-all transform hover:-translate-y-1' />
            <FaYoutube className='text-xl cursor-pointer hover:text-red-500 transition-all transform hover:-translate-y-1' />
          </div>
        </div>

        {/* RIGHT SIDE: Navigation */}
        <nav>
          <ul className='flex flex-wrap justify-center gap-8 text-sm font-semibold tracking-widest'>
            <li className='cursor-pointer hover:text-blue-400 transition-colors'>HOME</li>
            <li className='cursor-pointer hover:text-blue-400 transition-colors'>BOOKINGS</li>
            <li className='cursor-pointer hover:text-blue-400 transition-colors'>ROOMS</li>
            <li className='cursor-pointer hover:text-blue-400 transition-colors'>CONTACT</li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section: Copyright */}
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-500 border-t border-slate-800/50 pt-8'>
        <p>© 2025 LUXE HOTEL. All rights reserved</p>
        <div className='flex gap-6'>
          <span className='cursor-pointer hover:text-slate-300'>Privacy Policy</span>
          <span className='cursor-pointer hover:text-slate-300'>Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
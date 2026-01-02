import React from 'react';
import bgImage from '../assets/hero.jpeg';

const Hero = () => {

  const scrollToRooms = () => {
    const section = document.getElementById('rooms');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='relative h-screen w-full overflow-hidden'>


      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${bgImage})`,
          animation: 'slowZoom 3s infinite alternate ease-in-out'
        }}
      ></div>

      <style>
        {`
          @keyframes slowZoom {
            from { transform: scale(1); }
            to { transform: scale(1.15); }
          }
        `}
      </style>

      <div className='absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-[#0F1717] z-10'></div>

      <div className='relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4'>

        <p className='text-[10px] md:text-[11px] tracking-[0.6em] uppercase font-medium mb-5 text-[#D4AF37] opacity-90'>
          Since 1995 • The Royal Stay
        </p>

        <div className='flex flex-col items-center'>
          <h2 className='text-3xl md:text-4xl font-serif italic font-light tracking-wide leading-tight mb-1'>
            Enjoy a Luxury
          </h2>
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-sans font-extrabold tracking-[0.25em] uppercase leading-tight'>
            Experience
          </h1>
        </div>

        <p className='mt-6 max-w-md text-slate-300 text-xs md:text-sm font-light leading-relaxed tracking-wider opacity-75'>
          Discover a world of comfort and elegance. Your perfect gateway to a
          tranquil and sophisticated lifestyle.
        </p>

        <div className='flex flex-col sm:flex-row gap-5 mt-10'>
          <button
            onClick={scrollToRooms}
            className='group relative bg-[#D4AF37] text-[#0F1717] font-bold py-4 px-12 tracking-[0.3em] text-[10px] uppercase transition-all duration-500 cursor-pointer overflow-hidden'
          >
            <span className='relative z-10'>Book Your Stay</span>
            <div className='absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300'></div>
          </button>

          <button
            onClick={scrollToRooms}
            className='group border border-white/20 text-white font-bold py-4 px-12 tracking-[0.3em] text-[10px] uppercase hover:border-[#D4AF37] transition-all duration-500 backdrop-blur-sm cursor-pointer overflow-hidden relative'
          >
            <span className='relative z-10 group-hover:text-[#D4AF37] transition-colors'>Explore Rooms</span>
          </button>
        </div>

      </div>

      <div className='absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center'>
        <div className='w-px h-16 bg-linear-to-b from-transparent via-[#D4AF37] to-transparent opacity-60 animate-bounce'></div>
      </div>
    </div>
  )
}

export default Hero;
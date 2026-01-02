import React from 'react'
import { FaUtensils, FaBed, FaTv, FaSwimmingPool, FaShower, FaCar } from 'react-icons/fa'


const services = [
  { icon: <FaUtensils size={40} />, title: "Fine Dining", desc: 'Experience world-class culinary delights with our award-winning chefs and organic ingredients.' },
  { icon: <FaBed size={40} />, title: "Luxury Suites", desc: 'Hand-picked linens and smart room controls ensure your stay is as comfortable as it is royal.' },
  { icon: <FaTv size={40} />, title: "Entertainment", desc: 'High-speed fiber connectivity and premium cinema lounges for your leisure hours.' },
  { icon: <FaSwimmingPool size={40} />, title: "Infinity Pool", desc: 'A temperature-controlled pool area with a panoramic view of the city skyline.' },
  { icon: <FaShower size={40} />, title: "Wellness & Spa", desc: 'Relax with our therapeutic hot springs and premium wellness treatments available 24/7.' },
  { icon: <FaCar size={40} />, title: "Valet Parking", desc: 'Secure and spacious parking with 24-hour surveillance and private chauffeur services.' }
]

const Facility = () => {
  return (
    <section id="facilities" className='bg-[#0F1717] py-24 px-6 md:px-20 border-b border-white/5'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-16 relative'>

      
        <div className='md:w-1/3 md:sticky md:top-32 md:self-start h-fit mb-12 md:mb-0'>
          <p className='text-[10px] tracking-[0.5em] uppercase text-[#D4AF37] font-bold mb-4'>
            Exclusive Amenities
          </p>
          <h2 className='text-5xl md:text-6xl font-serif text-white leading-[1.1]'>
            Why <span className='italic font-light text-white/40'>choose us</span>
          </h2>
          <div className='w-16 h-px bg-[#D4AF37] mt-8 opacity-60'></div>
          <p className='mt-8 text-gray-400 font-light leading-relaxed max-w-xs text-sm tracking-wide'>
            At Luxe Hotel, we redefine comfort through meticulous attention to detail and world-class services.
          </p>
        </div>

      
        <div className='md:w-2/3'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
           
            {services.map((service, index) => (
              <div
                key={index}
                className='group bg-[#161D1D] border border-white/5 p-10 md:p-12 min-h-[350px] flex flex-col justify-center transition-all duration-700 hover:bg-[#1A2222] hover:border-[#D4AF37]/30 hover:-translate-y-2'
              >
              
                <div className='relative w-fit mb-10'>
                  <div className='absolute -inset-4 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/10 transition-all duration-500'></div>
                  <div className='relative text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-all duration-500'>
                    {service.icon}
                  </div>
                </div>

                <h3 className='text-lg font-serif tracking-widest text-white mb-5 uppercase'>
                  {service.title}
                </h3>
                <p className='text-gray-400 font-light leading-relaxed text-[14px] tracking-wide'>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Facility;
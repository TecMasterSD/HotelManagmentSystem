import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/#home' },
    { name: 'ROOMS', path: '/listing' }, // ✅ Changed to listing page
    { name: 'GALLERY', path: '/#gallery' },
    { name: 'CONTACT', path: '/#footer' },
  ];

  const { user } = useSelector((state) => state.auth);

  return (
    <nav className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${
      scrolled ? 'bg-[#0F1717] py-4 shadow-xl' : 'bg-transparent py-7'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="z-110">
          <h2 className="text-xl md:text-2xl tracking-[5px] font-serif text-[#F4F1EA]">
            LUXE <span className="text-[#D4AF37] italic font-light">HOTEL</span> 
          </h2>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex gap-8 font-sans tracking-[3px] text-[10px] text-[#F4F1EA]">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link 
                  to={link.path} 
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {link.name}
                </Link>
                <span className={`absolute -bottom-1 left-0 h-px bg-[#D4AF37] transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </li>
            ))}
          </ul>
          
          <div className="flex gap-6 items-center border-l border-[#D4AF37]/30 pl-8">
            {user ? (
              <Link
                to="/dashboard"
                className="text-[10px] tracking-[3px] hover:text-[#D4AF37] text-[#F4F1EA]"
              >
                {user.username}
              </Link>
            ) : (
              <Link
                to="/auth/login"
                className="text-[10px] tracking-[3px] hover:text-[#D4AF37] text-[#F4F1EA]"
              >
                LOGIN
              </Link>
            )}

            <Link
              to="/listing" // ✅ Reservation / Rooms page
              className="px-6 py-2.5 border border-[#D4AF37] text-[#D4AF37] text-[10px] tracking-[3px] hover:bg-[#D4AF37] hover:text-[#0F1717] transition-all duration-300"
            >
              RESERVE
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="lg:hidden z-110 flex flex-col gap-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`h-px w-7 bg-[#D4AF37] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
          <span className={`h-px w-7 bg-[#D4AF37] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-px w-7 bg-[#D4AF37] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#0F1717] z-105 flex flex-col justify-center items-center transition-transform duration-700 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-[#F4AF37] text-2xl tracking-[5px] font-serif hover:text-[#D4AF37]"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-20 bg-[#D4AF37]/30 my-4"></div>
            {user ? (
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="text-[#F4AF37] tracking-[4px]"
              >
                {user.username}
              </Link>
            ) : (
              <Link
                to="/auth/login"
                onClick={() => setIsOpen(false)}
                className="text-[#F4AF37] tracking-[4px]"
              >
                LOGIN
              </Link>
            )}
            <Link
              to="/listing"
              onClick={() => setIsOpen(false)}
              className="mt-4 px-10 py-4 bg-[#D4AF37] text-[#0F1717] font-bold tracking-[4px]"
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

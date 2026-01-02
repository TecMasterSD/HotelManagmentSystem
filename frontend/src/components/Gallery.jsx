import React, { useState } from 'react';

// Assets Imports (Wahi rahenge)
import parking from '../assets/gallery/parking.png';
import reception1 from '../assets/gallery/reception1.png';
import living from '../assets/gallery/living.png';
import hotelhero from '../assets/gallery/hotelhero.png';
import room1 from '../assets/gallery/room1.png';
import room2 from '../assets/gallery/room2.png';
import master from '../assets/gallery/master.png';
import doublebed from '../assets/gallery/doublebed.png';
import hallway from '../assets/gallery/hallway.png';
import bathroom from '../assets/gallery/bathroom.png';

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const images = [
    { id: 1, src: parking, title: 'Secure Parking' },
    { id: 2, src: reception1, title: 'Grand Reception' },
    { id: 3, src: living, title: 'Luxury Living' },
    { id: 4, src: hotelhero, title: 'Exterior View' },
    { id: 5, src: room1, title: 'Deluxe Suite' },
    { id: 6, src: room2, title: 'Royal Room' },
    { id: 7, src: master, title: 'Master Suite' },
    { id: 8, src: doublebed, title: 'Double Bed' },
    { id: 9, src: hallway, title: 'Modern Hallway' },
    { id: 10, src: bathroom, title: 'En-suite Bath' },
  ];

  return (
    <section id="gallery" className="py-24 px-6 bg-linear-to-b from-[#8f6e7a] to-[#88a6c8]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37] font-bold mb-4">The Visual Experience</p>
          <h2 className="text-4xl font-serif text-[#0F1717]">Hotel Gallery</h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        {/* Flexbox Layout for Auto-Centering */}
        <div className="flex flex-wrap justify-center gap-6">
          {images.map((item) => (
            <div 
              key={item.id} 
              className="group relative w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)] h-64 overflow-hidden cursor-pointer shadow-md bg-white"
              onClick={() => setSelectedImg(item.src)}
            >
              {/* Image */}
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-[#0F1717]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <p className="text-white text-[10px] tracking-[0.3em] uppercase font-bold">{item.title}</p>
                   <div className="w-8 h-px bg-[#D4AF37] mx-auto mt-2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox */}
        {selectedImg && (
          <div 
            className="fixed inset-0 z-999 bg-[#0f1717f2] backdrop-blur-md flex justify-center items-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-8 right-8 text-white text-5xl font-thin hover:text-[#D4AF37] transition-colors">&times;</button>
            <img 
              src={selectedImg} 
              alt="Full View" 
              className="max-w-full max-h-[85vh] object-contain shadow-2xl transition-all duration-500" 
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
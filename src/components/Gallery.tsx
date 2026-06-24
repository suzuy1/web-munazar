import React, { useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { COFFEE_PHOTOS } from '../data/menu';

export default function Gallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<'All' | 'Atmosphere' | 'Brewing' | 'Beans'>('All');

  const getCategory = (id: string) => {
    if (id === 'p1' || id === 'p2') return 'Atmosphere';
    if (id === 'p3' || id === 'p5') return 'Brewing';
    return 'Beans'; // p4, p6
  };

  const filteredPhotos = COFFEE_PHOTOS.filter((photo) => {
    if (filter === 'All') return true;
    return getCategory(photo.id) === filter;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    const prevIndex = activePhotoIndex === 0 ? filteredPhotos.length - 1 : activePhotoIndex - 1;
    setActivePhotoIndex(prevIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    const nextIndex = activePhotoIndex === filteredPhotos.length - 1 ? 0 : activePhotoIndex + 1;
    setActivePhotoIndex(nextIndex);
  };

  return (
    <section id="gallery" className="py-24 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full text-xs font-mono tracking-wider uppercase font-semibold">
            <Camera className="w-4 h-4" /> Estetika Cangkir & Ruang
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Galeri Seni Kopi <span className="font-serif italic text-amber-400 font-normal">coffi.premium</span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-light">
            Jelajahi setiap sudut estetika proses pembuatan kopi kami, mulai dari biji mentah pilihan hingga hasil seduhan akhir di atas meja Anda.
          </p>
          <div className="h-1 w-16 bg-amber-500 mx-auto rounded mt-4" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" id="gallery-filters">
          {[
            { key: 'All', label: 'Semua Foto' },
            { key: 'Atmosphere', label: 'Suasana Kafe' },
            { key: 'Brewing', label: 'Seni Menyeduh' },
            { key: 'Beans', label: 'Biji & Produk' },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => {
                setFilter(btn.key as any);
                setActivePhotoIndex(null); // Reset lightbox index safely
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                filter === btn.key
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-md shadow-amber-900/20'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-800'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="gallery-grid">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group cursor-pointer relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-800 border border-stone-800/80 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image */}
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />

              {/* Elegant Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 space-y-1.5">
                  <div className="flex items-center gap-1 text-amber-500 font-mono text-[10px] uppercase tracking-widest font-semibold">
                    <span>{getCategory(photo.id) === 'Atmosphere' ? 'Suasana Kafe' : getCategory(photo.id) === 'Brewing' ? 'Seni Menyeduh' : 'Biji & Produk'}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white">{photo.title}</h3>
                  <p className="text-stone-300 text-xs font-light leading-relaxed">{photo.desc}</p>
                  
                  {/* Action Link Indicator */}
                  <span className="inline-flex items-center gap-1 text-amber-400 font-medium text-xs pt-1">
                    <Eye className="w-3.5 h-3.5" /> Perbesar Foto
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Fullscreen Image Slider Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/98 flex items-center justify-center p-4 sm:p-8 backdrop-blur-sm animate-fade-in"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-white transition-colors z-55 shadow-md"
            id="lightbox-close-btn"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-all z-55 shadow-md"
            id="lightbox-prev-btn"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Large Image View */}
          <div
            className="max-w-5xl max-h-[80vh] flex flex-col items-center justify-center relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[activePhotoIndex].url}
              alt={filteredPhotos[activePhotoIndex].title}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-stone-800"
              referrerPolicy="no-referrer"
            />
            {/* Descriptive Caption Bar */}
            <div className="w-full text-center mt-6 max-w-2xl px-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-500 font-bold mb-1 block">
                {getCategory(filteredPhotos[activePhotoIndex].id) === 'Atmosphere' ? 'Suasana Kafe' : getCategory(filteredPhotos[activePhotoIndex].id) === 'Brewing' ? 'Seni Menyeduh' : 'Biji & Produk'}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {filteredPhotos[activePhotoIndex].title}
              </h3>
              <p className="text-stone-400 text-sm mt-1.5 font-light">
                {filteredPhotos[activePhotoIndex].desc}
              </p>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-all z-55 shadow-md"
            id="lightbox-next-btn"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}

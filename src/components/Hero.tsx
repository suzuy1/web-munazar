import React from 'react';
import { Coffee, ArrowDown, Sparkles, Award, Compass } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
}

export default function Hero({ onExploreMenu }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-stone-950 overflow-hidden pt-16"
    >
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop"
          alt="Coffi Premium Cafe Ambience"
          className="w-full h-full object-cover object-center opacity-40 scale-105 animate-subtle-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
        <div className="absolute inset-0 bg-radial-gradient-to-c from-transparent via-transparent to-stone-950/90" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Aesthetic Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-4.5 py-1.5 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-amber-500 font-mono text-xs tracking-widest uppercase font-semibold">
            Premium Coffee Sanctuary
          </span>
        </div>

        {/* Brand Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight mb-6 select-none">
          coffi<span className="text-amber-500">.</span>premium
        </h1>

        {/* Stylized Quote/Description */}
        <p className="font-serif italic text-lg sm:text-2xl text-stone-300 max-w-2xl mb-4 font-light leading-relaxed">
          &ldquo;Setiap tetes adalah harmoni rasa, setiap cangkir adalah karya seni yang diseduh dengan jiwa.&rdquo;
        </p>
        
        <p className="text-stone-400 max-w-xl text-sm sm:text-base font-light mb-10 leading-relaxed">
          Menyajikan biji kopi Arabika pilihan bersertifikat <em>Specialty Grade</em> dari seluruh nusantara, disangrai presisi, dan diseduh oleh barista bersertifikat internasional.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-amber-900/30 group text-sm"
            id="hero-order-btn"
          >
            <Coffee className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Pesan Online Sekarang
          </button>
          
          <a
            href="#gallery"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-700 hover:border-stone-500 text-white font-semibold tracking-wide transition-all duration-300 text-sm backdrop-blur-sm"
          >
            Lihat Galeri Foto
          </a>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 mt-16 sm:mt-24 w-full border-t border-stone-800/80 pt-10 text-stone-300 text-left">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-900 border border-stone-800 rounded-2xl text-amber-500 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-1">Arabika Specialty</h3>
              <p className="text-xs text-stone-400 leading-relaxed">Hanya menyajikan biji kopi dengan skor cupping &gt;80 dari petani lokal terpercaya.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-900 border border-stone-800 rounded-2xl text-amber-500 shrink-0">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-1">Penyangraian Presisi</h3>
              <p className="text-xs text-stone-400 leading-relaxed">Roasting profil mikro-batch untuk menonjolkan keunikan rasa khas daerah asal.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-900 border border-stone-800 rounded-2xl text-amber-500 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white mb-1">Bebas Custom Seduhan</h3>
              <p className="text-xs text-stone-400 leading-relaxed">Atur rasa manis, es batu, hingga ukuran susu sesuai selera personal Anda.</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-stone-500 hover:text-amber-500 transition-colors animate-bounce mt-12"
        >
          <span className="text-[10px] uppercase font-mono tracking-widest mb-1.5 font-semibold">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

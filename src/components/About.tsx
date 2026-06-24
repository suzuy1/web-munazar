import React from 'react';
import { Leaf, Award, Heart, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content Area */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs font-semibold text-amber-700 tracking-widest uppercase block">
                Filosofi & Dedikasi
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                Menghidupkan Tradisi Rasa yang <span className="font-serif italic text-amber-700 font-normal">Sempurna</span>
              </h2>
              <div className="h-1 w-20 bg-amber-600 rounded" />
            </div>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
              Berawal dari keinginan kecil untuk memperkenalkan keagungan rasa kopi Nusantara berkualitas dunia, <strong className="font-semibold text-stone-800">coffi.premium</strong> didirikan di atas pilar rasa hormat kepada petani lokal, presisi sains penyeduhan, dan ketulusan pelayanan.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
              Kami percaya bahwa kopi bukan sekadar minuman penghalau kantuk, melainkan medium kontemplasi, jembatan percakapan hangat, dan buah dari kerja keras rantai pasok yang adil. Oleh karena itu, kami bekerja sama langsung (direct trade) dengan komunitas petani di dataran tinggi Gayo, Kintamani, Lintong, hingga Flores Bajawa untuk mengamankan buah ceri kopi merah matang sempurna demi cangkir Anda.
            </p>

            {/* Micro Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-800">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900">Eko-Sourcing Lestari</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">Mendukung ekosistem tani ramah lingkungan tanpa pestisida kimia berbahaya.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-800">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900">Mikro-Roasting Lokal</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">Profil sangrai khusus dijaga ketat agar cita rasa autentik biji tidak tertutup gosong.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-800">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900">Diseduh Dengan Cinta</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">Setiap cangkir diukur berat bubuk kopi, keasaman air, dan suhu seduh secara presisi.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-800">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900">Garansi Kepuasan Rasa</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">Kurang sesuai selera? Sampaikan kepada barista kami untuk diseduh ulang gratis.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graphical/Image Montage Area */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main Large Image */}
              <div className="absolute inset-4 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10 bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"
                  alt="Dripping premium filter coffee"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Decorative Accent Badges */}
              <div className="absolute -top-2 -left-2 w-32 h-32 bg-amber-100 rounded-3xl -z-10 animate-pulse" />
              <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-stone-200 rounded-3xl -z-10" />

              {/* Circular Overlay Badge */}
              <div className="absolute -bottom-4 -left-4 bg-stone-900 text-stone-100 p-6 rounded-2xl shadow-xl z-20 max-w-[180px] border border-stone-800">
                <p className="font-serif text-3xl font-bold text-amber-500">100%</p>
                <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mt-1 font-semibold">
                  Arabika Asli Nusantara
                </p>
              </div>

              {/* Secondary Accent Overlay Image */}
              <div className="absolute -right-10 top-12 w-32 h-44 rounded-2xl overflow-hidden shadow-lg border-2 border-white z-20 hidden sm:block bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400&auto=format&fit=crop"
                  alt="Roasted coffee beans closeup"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Star, MessageSquareQuote, ShieldCheck } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: 'Rian Anggara',
      role: 'Coffee Blogger & Q-Grader',
      comment: 'Latte Velvet mereka luar biasa lembut! Rasa cokelat alaminya bersatu sempurna dengan espresso yang memiliki acidity buah yang tipis. Tempat paling konsisten untuk menikmati kopi arabika single-origin berkualitas di Jakarta Selatan.',
      stars: 5,
      date: '10 Mei 2026',
    },
    {
      id: 2,
      name: 'Amalia Siregar',
      role: 'Regular Guest',
      comment: 'Iced Caramel Macchiato di sini sangat spesial. Mereka bikin sirup karamelnya sendiri, rasanya gurih manis tidak pahit gosong seperti tempat lain. Kroisannya juga selalu renyah, berlapis-lapis mentega harum. Favorit keluarga!',
      stars: 5,
      date: '28 Mei 2026',
    },
    {
      id: 3,
      name: 'Chef Edwin',
      role: 'Culinary Consultant',
      comment: 'Sangat mengapresiasi presisi mereka dalam merancang menu. Suhu ekstraksi, berat air, dan pemilihan biji kopinya dipantau sangat profesional. Sangat layak menyandang predikat Premium. Ditambah lagi pastries mereka dipanggang segar setiap pagi!',
      stars: 5,
      date: '12 Juni 2026',
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs font-semibold text-amber-700 tracking-widest uppercase block">
            Ulasan Penikmat Kopi
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Cerita Hangat dari <span className="font-serif italic text-amber-700 font-normal">Meja Kami</span>
          </h2>
          <div className="h-1 w-16 bg-amber-600 mx-auto rounded mt-4" />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-50 p-8 rounded-3xl border border-stone-200/50 shadow-sm relative flex flex-col justify-between gap-6 hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Quote Mark Decorative */}
              <div className="absolute top-6 right-8 text-stone-200/80 group-hover:text-amber-200 transition-colors duration-300">
                <MessageSquareQuote className="w-10 h-10" />
              </div>

              {/* Main Content */}
              <div className="space-y-4 relative z-10">
                {/* Star rating */}
                <div className="flex gap-1">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                
                <p className="text-stone-600 text-sm leading-relaxed font-light italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* User Bio and Profile */}
              <div className="border-t border-stone-200/60 pt-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-serif font-bold text-stone-900 text-sm truncate">{rev.name}</h4>
                  <p className="text-[10px] text-stone-400 font-mono mt-0.5">{rev.role}</p>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-mono text-stone-400 uppercase tracking-wider bg-stone-200/50 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-green-600" /> Terverifikasi
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { Coffee, Instagram, Twitter, MessageCircle, Heart, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-stone-900 pb-12 mb-12">
          
          {/* Brand and Description column */}
          <div className="space-y-4 md:col-span-1">
            <a href="#home" className="flex items-center gap-2 group text-white">
              <div className="p-2 rounded-full bg-amber-600">
                <Coffee className="w-4 h-4 text-stone-950" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wide">
                coffi<span className="text-amber-500">.</span>premium
              </span>
            </a>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Sebuah ruang kontemplasi rasa di tengah hiruk-pikuk kota. Menyajikan seduhan kopi specialty kualitas dunia dengan pendekatan sains presisi dan cinta sejati.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-stone-900 hover:bg-amber-600 hover:text-stone-950 rounded-full transition-colors text-stone-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-stone-900 hover:bg-amber-600 hover:text-stone-950 rounded-full transition-colors text-stone-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-stone-900 hover:bg-amber-600 hover:text-stone-950 rounded-full transition-colors text-stone-300"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Hubungi Kami</h4>
            <ul className="space-y-3 text-xs font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>(021) 829-1029</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>hello@coffi.premium</span>
              </li>
            </ul>
          </div>

          {/* Operational Hours Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Jam Operasional</h4>
            <ul className="space-y-3 text-xs font-light">
              <li className="flex justify-between border-b border-stone-900 pb-1.5">
                <span className="font-semibold text-stone-300">Senin - Jumat:</span>
                <span className="font-mono text-amber-500">07:00 - 22:00 WIB</span>
              </li>
              <li className="flex justify-between border-b border-stone-900 pb-1.5">
                <span className="font-semibold text-stone-300">Sabtu - Minggu:</span>
                <span className="font-mono text-amber-500">08:00 - 23:00 WIB</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold text-stone-300">Hari Libur Nasional:</span>
                <span className="font-mono text-amber-500">09:00 - 21:00 WIB</span>
              </li>
            </ul>
          </div>

          {/* Sourcing locations column */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Origin Kopi Kami</h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Gayo Arabika', 'Kintamani Bali', 'Lintong Sumatra', 'Flores Bajawa', 'Toraja Sapan', 'Ijen Blue Mountain'].map((origin) => (
                <span
                  key={origin}
                  className="text-[10px] font-mono bg-stone-900 border border-stone-800 text-stone-300 px-2.5 py-1 rounded-full hover:border-amber-500/50 hover:text-white transition-colors cursor-default"
                >
                  {origin}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer bottom credit bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-center gap-4 text-xs font-light">
          <p>
            &copy; {new Date().getFullYear()} <strong className="font-semibold">coffi.premium</strong>. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <p className="flex items-center gap-1">
            Dibuat penuh kehangatan & cinta <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600" /> untuk para pecinta kopi sejati.
          </p>
        </div>

      </div>
    </footer>
  );
}

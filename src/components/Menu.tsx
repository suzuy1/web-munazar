import React, { useState } from 'react';
import { Star, Coffee, Sliders, ShoppingBag, Plus, Sparkles, AlertCircle } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data/menu';

interface MenuProps {
  onAddToCart: (item: CartItem) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Coffee' | 'Cold Brew' | 'Non-Coffee' | 'Pastry'>('All');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Customization States
  const [size, setSize] = useState<'Regular' | 'Large'>('Regular');
  const [sugar, setSugar] = useState<'Less' | 'Normal' | 'Extra'>('Normal');
  const [ice, setIce] = useState<'No Ice' | 'Less Ice' | 'Normal'>('Normal');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleOpenCustomizer = (item: MenuItem) => {
    setSelectedItem(item);
    setSize('Regular');
    setSugar('Normal');
    setIce('Normal');
    setNotes('');
    setQuantity(1);
  };

  const getCustomizedPrice = () => {
    if (!selectedItem) return 0;
    let basePrice = selectedItem.price;
    if (size === 'Large' && selectedItem.category !== 'Pastry') {
      basePrice += 6000; // Extra charge for large size
    }
    return basePrice * quantity;
  };

  const handleAddToCartSubmit = () => {
    if (!selectedItem) return;
    
    // Create a deterministic unique ID based on item ID + size + sugar + ice + notes snippet
    const customId = `${selectedItem.id}-${size}-${sugar}-${ice}-${notes.trim().substring(0, 10)}`;

    const cartItem: CartItem = {
      id: customId,
      menuItem: selectedItem,
      quantity,
      size,
      sugarLevel: sugar,
      iceLevel: ice,
      notes: notes.trim() || undefined,
    };

    onAddToCart(cartItem);
    setSelectedItem(null); // Close modal
  };

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const isDrink = selectedItem ? selectedItem.category !== 'Pastry' : false;
  const isColdDrink = selectedItem ? selectedItem.category === 'Cold Brew' : false;

  return (
    <section id="menu" className="py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs font-semibold text-amber-700 tracking-widest uppercase block">
            Citra Rasa Autentik
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Menu Kopi & Kudapan <span className="font-serif italic text-amber-700 font-normal">Pilihan</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light">
            Setiap racikan menu kami menggunakan bahan premium organik dengan takaran presisi untuk menghadirkan kepuasan murni di setiap seruputan.
          </p>
          <div className="h-1 w-16 bg-amber-600 mx-auto rounded mt-4" />
        </div>

        {/* Categories Carousel */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12" id="menu-categories">
          {[
            { key: 'All', label: 'Semua Menu' },
            { key: 'Coffee', label: 'Kopi Panas (Classic)' },
            { key: 'Cold Brew', label: 'Es Kopi (Signature)' },
            { key: 'Non-Coffee', label: 'Non-Kopi (Gourmet)' },
            { key: 'Pastry', label: 'Bakery & Pastri' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as any)}
              className={`px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
                activeCategory === cat.key
                  ? 'bg-amber-600 text-stone-950 border-amber-600 shadow-lg shadow-amber-900/10 font-bold'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="menu-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image with Tag */}
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100 shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Popular Badge */}
                {item.popular && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-amber-500 text-stone-950 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    <Sparkles className="w-3 h-3 animate-pulse" /> Terlaris
                  </span>
                )}

                {/* Star Rating Badge */}
                <span className="absolute bottom-4 right-4 bg-stone-950/80 backdrop-blur-sm text-amber-400 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {item.rating.toFixed(1)}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-mono text-base font-bold text-stone-950 shrink-0">
                      {formatRupiah(item.price)}
                    </span>
                  </div>
                  
                  <p className="text-stone-500 text-xs leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tasting Notes */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tastingNotes.map((note, index) => (
                      <span
                        key={index}
                        className="text-[10px] font-mono font-medium text-stone-500 bg-stone-100 border border-stone-200/50 px-2 py-0.5 rounded"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add/Customize Trigger Button */}
                <button
                  onClick={() => handleOpenCustomizer(item)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-amber-600/30 text-amber-700 font-semibold hover:bg-amber-600 hover:text-stone-950 transition-all duration-250 text-xs tracking-wider uppercase group-hover:bg-amber-600 group-hover:text-stone-950 group-hover:border-amber-600"
                  id={`customize-btn-${item.id}`}
                >
                  <Plus className="w-4 h-4" /> Pesan / Sesuaikan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DRINK CUSTOMIZATION MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col border border-stone-200 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            id="customizer-modal"
          >
            {/* Modal Image Header */}
            <div className="relative h-48 bg-stone-100 shrink-0">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block mb-1">
                    {selectedItem.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">{selectedItem.name}</h3>
                </div>
                <span className="font-mono text-lg font-bold text-amber-400">
                  {formatRupiah(selectedItem.price)}
                </span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-all border border-white/20"
                id="customizer-close-btn"
              >
                &times;
              </button>
            </div>

            {/* Modal Scrollable Options */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[50vh] text-stone-800">
              {/* SIZE option (only for beverages) */}
              {isDrink && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold font-mono uppercase text-stone-500 tracking-wider">
                      Pilihan Ukuran Gelas
                    </label>
                    <span className="text-[10px] text-stone-400 font-medium">Large (+Rp 6.000)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSize('Regular')}
                      className={`p-3.5 rounded-xl border-2 text-left transition-all duration-150 ${
                        size === 'Regular'
                          ? 'border-amber-600 bg-amber-500/5 text-amber-900'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm">Regular</div>
                      <div className="text-[10px] text-stone-500 font-mono mt-0.5">Approx. 350ml</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSize('Large')}
                      className={`p-3.5 rounded-xl border-2 text-left transition-all duration-150 ${
                        size === 'Large'
                          ? 'border-amber-600 bg-amber-500/5 text-amber-900'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm">Large</div>
                      <div className="text-[10px] text-stone-500 font-mono mt-0.5">Approx. 470ml (+Rp6rb)</div>
                    </button>
                  </div>
                </div>
              )}

              {/* SUGAR levels (only for beverages) */}
              {isDrink && (
                <div className="space-y-2.5">
                  <label className="text-xs font-bold font-mono uppercase text-stone-500 tracking-wider block">
                    Kadar Kemanisan (Gula)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'Less', label: 'Kurang Gula', desc: 'Less Sugar (50%)' },
                      { key: 'Normal', label: 'Normal Gula', desc: 'Standard (100%)' },
                      { key: 'Extra', label: 'Lebih Gula', desc: 'Extra Sweet (130%)' },
                    ].map((sug) => (
                      <button
                        key={sug.key}
                        type="button"
                        onClick={() => setSugar(sug.key as any)}
                        className={`py-3 px-2 rounded-xl border text-center transition-all duration-150 text-xs font-semibold ${
                          sugar === sug.key
                            ? 'border-amber-600 bg-amber-500/5 text-amber-900 font-bold'
                            : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
                        }`}
                      >
                        {sug.label}
                        <span className="block text-[8px] text-stone-400 font-normal font-mono mt-0.5">{sug.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ICE levels (only for cold drinks) */}
              {isColdDrink && (
                <div className="space-y-2.5">
                  <label className="text-xs font-bold font-mono uppercase text-stone-500 tracking-wider block">
                    Takaran Es Batu
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'No Ice', label: 'Tanpa Es' },
                      { key: 'Less Ice', label: 'Es Sedikit' },
                      { key: 'Normal', label: 'Es Normal' },
                    ].map((iceLevel) => (
                      <button
                        key={iceLevel.key}
                        type="button"
                        onClick={() => setIce(iceLevel.key as any)}
                        className={`py-3 px-2 rounded-xl border text-center transition-all duration-150 text-xs font-semibold ${
                          ice === iceLevel.key
                            ? 'border-amber-600 bg-amber-500/5 text-amber-900 font-bold'
                            : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
                        }`}
                      >
                        {iceLevel.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CUSTOM INSTRUCTION NOTES */}
              <div className="space-y-2">
                <label className="text-xs font-bold font-mono uppercase text-stone-500 tracking-wider block">
                  Catatan Khusus (Opsional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Susu ganti Oatmilk, kurangi es, dsb..."
                  maxLength={120}
                  className="w-full border border-stone-200 hover:border-stone-300 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none font-sans"
                  rows={2}
                />
              </div>

              {/* QUANTITY Selector */}
              <div className="flex items-center justify-between border-t border-stone-100 pt-4">
                <label className="text-xs font-bold font-mono uppercase text-stone-500 tracking-wider">
                  Jumlah Pemesanan
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full border border-stone-200 hover:border-stone-300 flex items-center justify-center font-bold text-stone-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-stone-200 hover:border-stone-300 flex items-center justify-center font-bold text-stone-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Bottom Footer Action */}
            <div className="bg-stone-50 p-6 border-t border-stone-100 flex items-center justify-between gap-4 shrink-0">
              <div className="text-left">
                <span className="text-[10px] text-stone-400 font-mono block">Subtotal</span>
                <span className="font-mono text-xl font-bold text-stone-900">
                  {formatRupiah(getCustomizedPrice())}
                </span>
              </div>
              <button
                onClick={handleAddToCartSubmit}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs tracking-wider uppercase transition-colors"
                id="add-to-cart-submit-btn"
              >
                <ShoppingBag className="w-4 h-4" /> Masukkan Keranjang
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

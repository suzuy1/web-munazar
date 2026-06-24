import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, ArrowRight, User, Hash, Info, Coffee } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveItem: (id: string) => void;
  onPlaceOrder: (customerName: string, tableNumber: string, orderNotes: string) => void;
}

export default function Cart({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}: CartProps) {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'DineIn' | 'Takeaway'>('DineIn');
  const [tableNumber, setTableNumber] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const getPricePerItem = (item: CartItem) => {
    let p = item.menuItem.price;
    if (item.size === 'Large' && item.menuItem.category !== 'Pastry') {
      p += 6000;
    }
    return p;
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + getPricePerItem(item) * item.quantity, 0);
  const pb1Tax = Math.round(cartSubtotal * 0.1); // 10% standard restaurant tax
  const serviceCharge = cartSubtotal > 0 ? 3000 : 0; // standard administrative service charge
  const grandTotal = cartSubtotal + pb1Tax + serviceCharge;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName.trim()) {
      setFormError('Silakan isi Nama Pemesan terlebih dahulu.');
      return;
    }

    if (orderType === 'DineIn' && !tableNumber.trim()) {
      setFormError('Silakan isi Nomor Meja untuk layanan Makan di Sini.');
      return;
    }

    setFormError('');
    onPlaceOrder(
      customerName.trim(),
      orderType === 'DineIn' ? `Meja #${tableNumber}` : 'Bawa Pulang (Takeaway)',
      orderNotes.trim()
    );

    // Reset checkout form fields safely
    setCustomerName('');
    setTableNumber('');
    setOrderNotes('');
  };

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-container">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-stone-100 animate-slide-left">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-900 text-white shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-amber-500 w-5 h-5" />
              <h2 className="font-serif text-lg font-bold">Keranjang Belanja</h2>
              <span className="bg-amber-500 text-stone-950 text-xs font-mono font-bold px-2 py-0.5 rounded-full">
                {cart.length} item
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
              id="cart-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form and Items Container */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                <div className="p-4 bg-stone-100 rounded-full text-stone-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg">Keranjang Anda Kosong</h3>
                  <p className="text-stone-500 text-xs max-w-[240px] mx-auto mt-1 leading-relaxed">
                    Jelajahi menu premium kami dan tambahkan secangkir kehangatan kopi pilihan Anda!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wide uppercase transition-colors"
                >
                  Lihat Menu Kopi
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wider">
                    Daftar Kopi & Kudapan
                  </h3>
                  <div className="divide-y divide-stone-100">
                    {cart.map((item) => (
                      <div key={item.id} className="py-4 flex gap-4 items-start first:pt-0 last:pb-0 group">
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200/50">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-grow min-w-0 space-y-1">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-serif font-bold text-stone-900 text-sm truncate">
                              {item.menuItem.name}
                            </h4>
                            <span className="font-mono text-xs font-bold text-stone-950 shrink-0">
                              {formatRupiah(getPricePerItem(item) * item.quantity)}
                            </span>
                          </div>

                          {/* Customized Settings Tags */}
                          {item.menuItem.category !== 'Pastry' ? (
                            <div className="flex flex-wrap gap-1">
                              <span className="text-[9px] font-mono font-medium text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                                {item.size}
                              </span>
                              <span className="text-[9px] font-mono font-medium text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                                Sugar: {item.sugarLevel}
                              </span>
                              {item.menuItem.category === 'Cold Brew' && (
                                <span className="text-[9px] font-mono font-medium text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                                  {item.iceLevel}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-[9px] font-mono font-medium text-amber-700 bg-amber-500/10 px-1.5 py-0.5 rounded">
                              Fresh Bakery
                            </span>
                          )}

                          {/* Item Custom Notes */}
                          {item.notes && (
                            <p className="text-[10px] text-stone-500 font-light italic truncate">
                              &ldquo;{item.notes}&rdquo;
                            </p>
                          )}

                          {/* Action Counter */}
                          <div className="flex items-center justify-between pt-1.5">
                            <div className="flex items-center gap-2.5">
                              <button
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-50"
                              >
                                -
                              </button>
                              <span className="font-mono text-xs font-bold text-stone-900 w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-50"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-stone-400 hover:text-red-600 p-1 rounded transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Checkout Form */}
                <form onSubmit={handleCheckoutSubmit} className="space-y-4 border-t border-stone-100 pt-6">
                  <h3 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wider">
                    Informasi Meja & Pemesan
                  </h3>

                  {formError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-700 text-xs animate-pulse">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Customer Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-stone-400" /> Nama Pelanggan *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Masukkan nama lengkap Anda..."
                      className="w-full border border-stone-200 hover:border-stone-300 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                    />
                  </div>

                  {/* Dine-in vs Takeaway Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-700">Tipe Layanan *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderType('DineIn')}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                          orderType === 'DineIn'
                            ? 'border-amber-600 bg-amber-500/5 text-amber-900 font-bold'
                            : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
                        }`}
                      >
                        Makan Di Sini (Dine In)
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('Takeaway')}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                          orderType === 'Takeaway'
                            ? 'border-amber-600 bg-amber-500/5 text-amber-900 font-bold'
                            : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
                        }`}
                      >
                        Bawa Pulang (Takeaway)
                      </button>
                    </div>
                  </div>

                  {/* Table Number (only if Dine-in) */}
                  {orderType === 'DineIn' && (
                    <div className="space-y-1.5 animate-fade-in">
                      <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-stone-400" /> Nomor Meja Anda *
                      </label>
                      <input
                        type="text"
                        required
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="Contoh: 04, 09, atau VIP..."
                        className="w-full border border-stone-200 hover:border-stone-300 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans font-mono"
                      />
                    </div>
                  )}

                  {/* Order-wide Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">Catatan Pemesanan Global</label>
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Misal: Sendok garpu dipisah, mint minta tisu ekstra..."
                      maxLength={150}
                      className="w-full border border-stone-200 hover:border-stone-300 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none font-sans"
                      rows={2}
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Checkout Footer Total Pricing */}
          {cart.length > 0 && (
            <div className="bg-stone-50 border-t border-stone-100 p-6 space-y-4 shrink-0 shadow-inner">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-stone-500">
                  <span>Subtotal Pesanan</span>
                  <span className="font-mono">{formatRupiah(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500">
                  <span>Pajak Restoran PB1 (10%)</span>
                  <span className="font-mono">{formatRupiah(pb1Tax)}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500">
                  <span>Biaya Layanan & Aplikasi</span>
                  <span className="font-mono">{formatRupiah(serviceCharge)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-200/55 pt-2.5">
                  <span className="font-serif">Total Pembayaran</span>
                  <span className="font-mono text-amber-700 text-base">{formatRupiah(grandTotal)}</span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                onClick={handleCheckoutSubmit}
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-xs tracking-wider uppercase group"
                id="cart-submit-btn"
              >
                Kirim Antrean Pemesanan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-1.5 justify-center text-[10px] text-stone-400 text-center font-mono font-medium">
                <Coffee className="w-3.5 h-3.5 text-amber-600/65" />
                <span>Pembayaran langsung di meja saat pesanan siap saji.</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

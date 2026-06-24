import React, { useState, useEffect } from 'react';
import { ShoppingBag, Coffee, ReceiptText, Menu as MenuIcon, X } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenOrders: () => void;
  orderCount: number;
}

export default function Header({ cart, onOpenCart, onOpenOrders, orderCount }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { href: '#home', label: 'Beranda' },
    { href: '#about', label: 'Tentang Kami' },
    { href: '#gallery', label: 'Galeri Kopi' },
    { href: '#menu', label: 'Menu Premium' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-900/95 backdrop-blur-md shadow-md py-4 text-stone-100'
          : 'bg-gradient-to-b from-black/60 to-transparent py-6 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="p-2 rounded-full bg-amber-600 group-hover:bg-amber-500 transition-colors">
              <Coffee className="w-5 h-5 text-stone-950" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-wide">
              coffi<span className="text-amber-500">.</span>premium
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-medium hover:text-amber-500 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-amber-500 hover:after:w-full after:transition-all after:duration-300 text-sm tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Ticket Order Status */}
            {orderCount > 0 && (
              <button
                onClick={onOpenOrders}
                className={`relative p-2 rounded-full transition-all duration-200 ${
                  isScrolled 
                    ? 'hover:bg-stone-800 text-amber-500 hover:text-amber-400' 
                    : 'hover:bg-white/10 text-amber-400 hover:text-amber-300'
                }`}
                title="Status Pemesanan"
                id="header-orders-btn"
              >
                <ReceiptText className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-full flex items-center justify-center animate-pulse">
                  {orderCount}
                </span>
              </button>
            )}

            {/* Shopping Bag / Cart */}
            <button
              onClick={onOpenCart}
              className={`relative p-2.5 rounded-full transition-all duration-200 ${
                isScrolled
                  ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              id="header-cart-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold font-mono w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-stone-900 border-t border-stone-800 py-4 px-4 space-y-3 absolute top-full left-0 right-0 shadow-xl animate-fade-in text-stone-100">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2.5 px-4 rounded-lg font-medium text-stone-300 hover:text-white hover:bg-stone-800 transition-all text-sm"
            >
              {link.label}
            </a>
          ))}
          {orderCount > 0 && (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenOrders();
              }}
              className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg font-medium text-amber-500 hover:bg-stone-800 transition-all text-sm"
            >
              <span className="flex items-center gap-2">
                <ReceiptText className="w-4 h-4" /> Lihat Status Pemesanan
              </span>
              <span className="bg-amber-500 text-stone-950 text-xs font-mono font-bold px-2 py-0.5 rounded-full">
                {orderCount} Pesanan
              </span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}

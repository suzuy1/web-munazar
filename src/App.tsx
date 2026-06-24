import React, { useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, Coffee, ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import { CartItem, Order } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // UI Panels State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  
  // Floating Toast Notification State
  const [toast, setToast] = useState<{ message: string; visible: boolean; type: 'success' | 'info' }>({
    message: '',
    visible: false,
    type: 'success'
  });

  // Load from LocalStorage on first render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('coffi_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem('coffi_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (e) {
      console.error('Error loading data from localStorage', e);
    }
  }, []);

  // Save to LocalStorage whenever cart/orders change
  useEffect(() => {
    try {
      localStorage.setItem('coffi_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error writing cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('coffi_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Error writing orders to localStorage', e);
    }
  }, [orders]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, visible: true, type });
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
    return () => clearTimeout(timer);
  };

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex > -1) {
        // Quantities accumulate
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        showToast(
          `Jumlah ${newItem.menuItem.name} (${newItem.size}) di keranjang ditambah menjadi ${updatedCart[existingItemIndex].quantity}!`,
          'info'
        );
        return updatedCart;
      } else {
        showToast(`${newItem.menuItem.name} (${newItem.size}) berhasil dimasukkan keranjang!`, 'success');
        return [...prevCart, newItem];
      }
    });
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    const itemToRemove = cart.find((i) => i.id === itemId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    if (itemToRemove) {
      showToast(`${itemToRemove.menuItem.name} dihapus dari keranjang.`, 'info');
    }
  };

  // Place Order Action
  const handlePlaceOrder = (customerName: string, tableNumber: string, orderNotes: string) => {
    // Generate unique Receipt ID: e.g., CP-3498
    const randomId = 'CP-' + Math.floor(1000 + Math.random() * 9000);

    const getPricePerItem = (item: CartItem) => {
      let p = item.menuItem.price;
      if (item.size === 'Large' && item.menuItem.category !== 'Pastry') {
        p += 6000;
      }
      return p;
    };

    const cartSubtotal = cart.reduce((acc, item) => acc + getPricePerItem(item) * item.quantity, 0);
    const pb1Tax = Math.round(cartSubtotal * 0.1);
    const serviceCharge = 3000;
    const grandTotal = cartSubtotal + pb1Tax + serviceCharge;

    const newOrder: Order = {
      id: randomId,
      customerName,
      tableNumber,
      items: [...cart],
      totalAmount: grandTotal,
      status: 'Queue',
      createdAt: new Date().toISOString(),
      notes: orderNotes || undefined,
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setCart([]); // Clear shopping cart
    setIsCartOpen(false); // Close cart drawer
    setIsOrdersOpen(true); // Open orders modal immediately to let user see receipt & status
    
    showToast(`Pesanan ${randomId} berhasil dikirim! Barista kami mulai mempersiapkan kopi Anda.`, 'success');
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => {
        if (o.id === orderId && o.status !== status) {
          if (status === 'Brewing') {
            showToast(`Barista mulai menyeduh pesanan ${orderId}! ☕`, 'info');
          } else if (status === 'Ready') {
            showToast(`Hore! Pesanan ${orderId} siap disajikan / diambil! 🎉`, 'success');
          } else if (status === 'Completed') {
            showToast(`Pesanan ${orderId} selesai. Selamat menikmati!`, 'success');
          }
          return { ...o, status };
        }
        return o;
      })
    );
  };

  const handleClearOrders = () => {
    if (confirm('Apakah Anda yakin ingin menghapus seluruh riwayat pesanan Anda?')) {
      setOrders([]);
      setIsOrdersOpen(false);
      showToast('Seluruh riwayat tiket pesanan dibersihkan.', 'info');
    }
  };

  const handleExploreMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header bar component */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        orderCount={orders.length}
      />

      {/* Main Core Sections */}
      <main className="flex-grow">
        {/* Hero banner section */}
        <Hero onExploreMenu={handleExploreMenu} />

        {/* Narrative story section */}
        <About />

        {/* Dynamic filterable Coffee & Food Menu section */}
        <Menu onAddToCart={handleAddToCart} />

        {/* Interactive photo gallery showcase */}
        <Gallery />

        {/* Verified reviews section */}
        <Reviews />
      </main>

      {/* Footer component */}
      <Footer />

      {/* Shopping Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Thermal printed receipt tracker */}
      <Orders
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onClearOrders={handleClearOrders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* FLOATING TOAST NOTIFICATION */}
      {toast.visible && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-2xl border flex items-center gap-3 max-w-sm transition-all duration-300 animate-slide-up ${
            toast.type === 'success'
              ? 'bg-stone-900 border-amber-500 text-stone-100'
              : 'bg-stone-900 border-stone-800 text-stone-200'
          }`}
          id="global-toast"
        >
          <div className={`p-1.5 rounded-full shrink-0 ${
            toast.type === 'success' ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-amber-500'
          }`}>
            <Check className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold leading-relaxed">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

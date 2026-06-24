import React, { useEffect, useState } from 'react';
import { Coffee, RotateCcw, Clock, CheckCircle2, Ticket, Receipt, Info, ShieldCheck } from 'lucide-react';
import { Order } from '../types';

interface OrdersProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onClearOrders: () => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export default function Orders({
  isOpen,
  onClose,
  orders,
  onClearOrders,
  onUpdateOrderStatus,
}: OrdersProps) {
  const [activeReceiptId, setActiveReceiptId] = useState<string | null>(null);

  useEffect(() => {
    // If we have orders, set the newest order as the active receipt to view
    if (orders.length > 0 && !activeReceiptId) {
      setActiveReceiptId(orders[orders.length - 1].id);
    }
  }, [orders, activeReceiptId]);

  // Live order status simulator
  useEffect(() => {
    const interval = setInterval(() => {
      orders.forEach((order) => {
        if (order.status === 'Queue') {
          // Move from Queue to Brewing after 15 seconds
          onUpdateOrderStatus(order.id, 'Brewing');
        } else if (order.status === 'Brewing') {
          // Move from Brewing to Ready after 25 seconds
          onUpdateOrderStatus(order.id, 'Ready');
        }
      });
    }, 12000); // Check every 12 seconds

    return () => clearInterval(interval);
  }, [orders, onUpdateOrderStatus]);

  if (!isOpen) return null;

  const activeOrder = orders.find((o) => o.id === activeReceiptId) || orders[orders.length - 1];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Queue':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Brewing':
        return 'bg-blue-100 text-blue-800 border-blue-200 animate-pulse';
      case 'Ready':
        return 'bg-green-100 text-green-800 border-green-200 animate-bounce';
      case 'Completed':
        return 'bg-stone-100 text-stone-600 border-stone-200';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'Queue':
        return 'Antrean Meja';
      case 'Brewing':
        return 'Sedang Diseduh Barista';
      case 'Ready':
        return 'Siap Diambil / Diantar';
      case 'Completed':
        return 'Selesai Dinikmati';
    }
  };

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const getPricePerItem = (item: any) => {
    let p = item.menuItem.price;
    if (item.size === 'Large' && item.menuItem.category !== 'Pastry') {
      p += 6000;
    }
    return p;
  };

  const calculateSubtotal = (order: Order) => {
    return order.items.reduce((acc, item) => {
      return acc + getPricePerItem(item) * item.quantity;
    }, 0);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-sm animate-fade-in" id="orders-modal-container">
      {/* Backdrop click closes modal */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-stone-100 rounded-3xl w-full max-w-4xl h-[85vh] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-stone-200 animate-scale-up z-10">
        
        {/* Left Column: List of orders */}
        <div className="w-full md:w-2/5 border-r border-stone-200 flex flex-col h-1/2 md:h-full bg-white shrink-0">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-900 text-stone-100 shrink-0">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif font-bold text-base">Tiket Pesanan Anda</h3>
            </div>
            {orders.length > 0 && (
              <button
                onClick={onClearOrders}
                className="text-[10px] font-mono text-stone-400 hover:text-red-400 border border-stone-800 hover:border-red-900 px-2 py-1 rounded transition-colors flex items-center gap-1 uppercase"
                id="clear-orders-btn"
              >
                <RotateCcw className="w-3 h-3" /> Reset Riwayat
              </button>
            )}
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-stone-400 p-6">
                <Clock className="w-8 h-8 mb-3 text-stone-300" />
                <p className="font-serif font-bold text-sm text-stone-700">Belum Ada Pemesanan</p>
                <p className="text-[11px] text-stone-500 max-w-[180px] mt-1">
                  Pesan kopi kesukaanmu dari daftar menu untuk melihat tiket langsung di sini.
                </p>
              </div>
            ) : (
              orders.map((o) => {
                const sub = calculateSubtotal(o);
                const active = activeReceiptId === o.id || (!activeReceiptId && orders[orders.length-1].id === o.id);
                return (
                  <button
                    key={o.id}
                    onClick={() => setActiveReceiptId(o.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      active
                        ? 'border-amber-600 bg-amber-500/5 shadow-md'
                        : 'border-stone-200/80 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-stone-900 uppercase">
                          {o.id}
                        </span>
                        <span className="text-[10px] text-stone-400 font-medium">{o.customerName}</span>
                      </div>
                      <p className="text-[10px] font-mono font-semibold text-amber-800">
                        {o.tableNumber}
                      </p>
                      <div className="text-[10px] font-mono text-stone-500">
                        {o.items.length} item • {formatRupiah(o.totalAmount)}
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className={`text-[9px] font-mono font-semibold px-2 py-1 rounded-full border ${getStatusColor(o.status)}`}>
                        {getStatusLabel(o.status)}
                      </span>
                      {o.status === 'Ready' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateOrderStatus(o.id, 'Completed');
                          }}
                          className="text-[9px] font-mono font-bold bg-amber-600 hover:bg-amber-500 text-stone-950 px-2 py-0.5 rounded mt-1 shadow-sm uppercase"
                        >
                          Selesaikan
                        </button>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="p-4 bg-stone-50 border-t border-stone-100 text-center shrink-0">
            <button
              onClick={onClose}
              className="text-stone-600 hover:text-stone-900 font-semibold text-xs tracking-wider uppercase"
              id="orders-close-btn"
            >
              Kembali ke Kafe
            </button>
          </div>
        </div>

        {/* Right Column: Thermal Receipt Detail view */}
        <div className="w-full md:w-3/5 bg-stone-100 flex flex-col h-1/2 md:h-full overflow-y-auto p-6 md:p-8 justify-center items-center">
          {activeOrder ? (
            <div className="w-full max-w-sm bg-white border border-stone-200 p-6 rounded-none shadow-xl relative font-mono text-stone-800 text-xs leading-relaxed animate-fade-in flex flex-col justify-between select-none min-h-[500px]" id="thermal-receipt">
              
              {/* Thermal receipt jagged top border effect */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[linear-gradient(45deg,transparent_33.333%,#f5f5f4_33.333%,#f5f5f4_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#f5f5f4_33.333%,#f5f5f4_66.667%,transparent_66.667%)] bg-[size:10px_10px]" />

              <div className="space-y-4">
                {/* Header */}
                <div className="text-center space-y-1 pt-2">
                  <h4 className="font-serif text-base font-bold text-stone-950 uppercase tracking-wider">coffi.premium</h4>
                  <p className="text-[10px] text-stone-500">Jl. Senopati No. 42, Kebayoran Baru, Jakarta</p>
                  <p className="text-[10px] text-stone-500">Telp: (021) 829-1029</p>
                  <p className="text-[10px] font-bold mt-2">----------------------------------------</p>
                </div>

                {/* Meta details */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>No. Tiket:</span>
                    <span className="font-bold text-stone-950">{activeOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tanggal:</span>
                    <span>{new Date(activeOrder.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}, 24 Juni 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kasir/Barista:</span>
                    <span>Andra W. (Barista #03)</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-950">
                    <span>Pemesan:</span>
                    <span>{activeOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between font-bold text-amber-700">
                    <span>Layanan:</span>
                    <span>{activeOrder.tableNumber}</span>
                  </div>
                </div>

                <p className="text-center font-bold text-stone-950 my-1">----------------------------------------</p>

                {/* Items list */}
                <div className="space-y-3">
                  {activeOrder.items.map((item, index) => {
                    const price = getPricePerItem(item);
                    return (
                      <div key={index} className="space-y-0.5">
                        <div className="flex justify-between font-bold text-stone-950">
                          <span className="truncate max-w-[200px]">{item.menuItem.name}</span>
                          <span>{formatRupiah(price * item.quantity)}</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-stone-500">
                          <span>{item.quantity} x {formatRupiah(price)} ({item.size})</span>
                        </div>
                        {item.menuItem.category !== 'Pastry' && (
                          <div className="text-[9px] text-stone-400 italic">
                            Sugar: {item.sugarLevel} • Ice: {item.iceLevel}
                          </div>
                        )}
                        {item.notes && (
                          <div className="text-[9px] text-amber-800 font-semibold pl-2 border-l border-amber-300">
                            * Catatan: {item.notes}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <p className="text-center font-bold text-stone-950 my-1">----------------------------------------</p>

                {/* Price calculations */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatRupiah(calculateSubtotal(activeOrder))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pajak PB1 (10%)</span>
                    <span>{formatRupiah(Math.round(calculateSubtotal(activeOrder) * 0.1))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Layanan & App</span>
                    <span>{formatRupiah(3000)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-950 text-sm border-t border-dashed border-stone-200 pt-1.5 mt-1">
                    <span>TOTAL</span>
                    <span>{formatRupiah(activeOrder.totalAmount)}</span>
                  </div>
                </div>

                {activeOrder.notes && (
                  <div className="p-2 bg-stone-100 rounded text-[9px] text-stone-600 mt-2">
                    <strong>Catatan Global:</strong> {activeOrder.notes}
                  </div>
                )}
              </div>

              {/* Status Section & Thank You Footer */}
              <div className="space-y-4 pt-4 mt-4 border-t border-stone-200">
                <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-stone-200/50 bg-stone-50 gap-1.5 text-center">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400">STATUS LIVE</span>
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                    <Coffee className="w-3.5 h-3.5 animate-bounce" />
                    <span>{getStatusLabel(activeOrder.status)}</span>
                  </div>
                  {activeOrder.status === 'Queue' && (
                    <p className="text-[9px] text-stone-500 leading-normal max-w-[200px]">
                      Pesanan Anda mengantre di pos barista. Sedang dipersiapkan dalam beberapa saat.
                    </p>
                  )}
                  {activeOrder.status === 'Brewing' && (
                    <p className="text-[9px] text-stone-500 leading-normal max-w-[200px]">
                      Biji kopi digiling segar & diekstraksi ganda. Susu sedang dipanaskan selembut sutra.
                    </p>
                  )}
                  {activeOrder.status === 'Ready' && (
                    <div className="space-y-1">
                      <p className="text-[9px] text-green-700 font-semibold leading-normal max-w-[200px]">
                        Hore! Secangkir kehangatan Anda telah selesai diseduh sempurna.
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-stone-950">
                    <ShieldCheck className="w-4 h-4 text-green-600" /> TERIMAKASIH
                  </div>
                  <p className="text-[9px] text-stone-500">Nikmati hari Anda bersama Coffi Premium!</p>
                </div>
              </div>

              {/* Thermal receipt jagged bottom border effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[linear-gradient(45deg,transparent_33.333%,#f5f5f4_33.333%,#f5f5f4_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#f5f5f4_33.333%,#f5f5f4_66.667%,transparent_66.667%)] bg-[size:10px_10px]" />
            </div>
          ) : (
            <div className="text-stone-400 flex flex-col items-center justify-center text-center p-6 bg-white border border-stone-200 rounded-3xl w-full max-w-sm h-64 shadow">
              <Receipt className="w-10 h-10 mb-2 text-stone-300" />
              <p className="font-serif font-bold text-sm text-stone-700">Pilih Tiket Pesanan</p>
              <p className="text-[11px] text-stone-500 mt-1">Pilih tiket pesanan di sebelah kiri untuk melihat struk pencetakan barista.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

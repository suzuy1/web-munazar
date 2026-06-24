export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Coffee' | 'Cold Brew' | 'Non-Coffee' | 'Pastry';
  rating: number;
  tastingNotes: string[];
  popular?: boolean;
}

export interface CartItem {
  id: string; // Unique ID representing item + customizations
  menuItem: MenuItem;
  quantity: number;
  size: 'Regular' | 'Large';
  sugarLevel: 'Less' | 'Normal' | 'Extra';
  iceLevel: 'No Ice' | 'Less Ice' | 'Normal';
  notes?: string;
}

export interface Order {
  id: string;
  customerName: string;
  tableNumber: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Queue' | 'Brewing' | 'Ready' | 'Completed';
  createdAt: string;
  notes?: string;
}

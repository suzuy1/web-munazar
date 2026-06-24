import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE CLASSICS
  {
    id: 'espresso-single',
    name: 'Single Origin Espresso',
    description: 'Ekstraksi murni dari biji kopi arabika pilihan (Gayo/Kintamani) dengan crema keemasan yang tebal dan aroma buah yang segar.',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1510591509382-7434f0b29ea2?q=80&w=600&auto=format&fit=crop',
    category: 'Coffee',
    rating: 4.8,
    tastingNotes: ['Citrusy', 'Chocolaty', 'Rich Crema'],
  },
  {
    id: 'premium-latte',
    name: 'Velvet Cafe Latte',
    description: 'Double shot espresso dipadukan dengan susu segar bertekstur selembut sutra, disajikan dengan latte art elegan buatan barista kami.',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop',
    category: 'Coffee',
    rating: 4.9,
    tastingNotes: ['Creamy', 'Sweet Aftertaste', 'Silky Smooth'],
    popular: true,
  },
  {
    id: 'flat-white',
    name: 'Artisan Flat White',
    description: 'Susu steamed mikro-foam halus dituangkan di atas ristretto ganda melahirkan keseimbangan rasa kopi yang kuat dan manis alami susu.',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=600&auto=format&fit=crop',
    category: 'Coffee',
    rating: 4.7,
    tastingNotes: ['Bold Espresso', 'Velvety Foam', 'Nutty'],
  },
  {
    id: 'cappuccino-classic',
    name: 'Classic Cappuccino',
    description: 'Espresso kental dengan rasio susu hangat dan busa susu tebal 1:1:1 yang sempurna, ditaburi bubuk cokelat organik di atasnya.',
    price: 36000,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop',
    category: 'Coffee',
    rating: 4.8,
    tastingNotes: ['Frothy', 'Cinnamon-hint', 'Balanced Taste'],
  },

  // COLD BREW & SPECIALS
  {
    id: 'iced-macchiato',
    name: 'Iced Caramel Macchiato',
    description: 'Susu dingin segar dengan sirup vanila artisan, es batu, ditimpa espresso ganda dan disiram saus karamel premium buatan rumah.',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=600&auto=format&fit=crop',
    category: 'Cold Brew',
    rating: 4.9,
    tastingNotes: ['Sweet Caramel', 'Layered', 'Refreshing Cold'],
    popular: true,
  },
  {
    id: 'citrus-coldbrew',
    name: 'Citrus Orange Cold Brew',
    description: 'Kopi cold brew yang diseduh dingin selama 16 jam, dipadukan dengan ekstrak jeruk segar alami dan madu hutan, sangat menyegarkan.',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?q=80&w=600&auto=format&fit=crop',
    category: 'Cold Brew',
    rating: 4.8,
    tastingNotes: ['Zesty Citrus', 'Sparkling Touch', 'Low Acidity'],
  },
  {
    id: 'hazelnut-iced-latte',
    name: 'Iced Hazelnut Latte',
    description: 'Kombinasi klasik espresso, susu segar dingin, dan sirup hazelnut panggang premium yang menghasilkan aroma kacang manis yang gurih.',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop',
    category: 'Cold Brew',
    rating: 4.6,
    tastingNotes: ['Nutty Hazelnut', 'Balanced Sweetness', 'Creamy Iced'],
  },

  // NON-COFFEE GOURMET
  {
    id: 'belgian-chocolate',
    name: 'Royal Belgian Chocolate',
    description: 'Cokelat Belgia hitam 70% cair yang dipanaskan dengan susu segar krem, menghasilkan rasa cokelat murni yang kental, kaya, dan hangat.',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop',
    category: 'Non-Coffee',
    rating: 4.9,
    tastingNotes: ['Deep Cocoa', 'Creamy Luxury', 'Comforting'],
  },
  {
    id: 'matcha-latte',
    name: 'Uji Matcha Latte',
    description: 'Teh hijau Matcha murni dari perkebunan Uji, Kyoto, Jepang, diaduk perlahan dengan susu segar hangat untuk rasa umami teh hijau otentik.',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=600&auto=format&fit=crop',
    category: 'Non-Coffee',
    rating: 4.8,
    tastingNotes: ['Earthy Green', 'Smooth Texture', 'Japanese Umami'],
    popular: true,
  },

  // BAKERY & PASTRY
  {
    id: 'butter-croissant',
    name: 'Classic Butter Croissant',
    description: 'Pastry khas Perancis yang dipanggang segar setiap pagi dengan lapisan mentega premium. Sangat renyah di luar, lembut dan berongga di dalam.',
    price: 26000,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop',
    category: 'Pastry',
    rating: 4.9,
    tastingNotes: ['Buttery Flakes', 'Warm & Toasty', 'Crispy Outer'],
    popular: true,
  },
  {
    id: 'pain-au-chocolat',
    name: 'Almond Pain au Chocolat',
    description: 'Croissant cokelat renyah bertabur kacang almond panggang pipih yang melimpah dan taburan gula halus salju, dengan lelehan cokelat di dalamnya.',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=600&auto=format&fit=crop',
    category: 'Pastry',
    rating: 4.7,
    tastingNotes: ['Almond Crunch', 'Dark Chocolate Core', 'Fragrant'],
  },
];

export const COFFEE_PHOTOS = [
  {
    id: 'p1',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
    title: 'The Brewing Table',
    desc: 'Ruang seduh kami yang modern dengan peralatan espresso tercanggih.'
  },
  {
    id: 'p2',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    title: 'Warm Conversation',
    desc: 'Sudut ternyaman di Coffi Premium untuk menikmati sore Anda.'
  },
  {
    id: 'p3',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    title: 'Perfect Extraction',
    desc: 'Presisi suhu dan tekanan menghasilkan aroma kopi yang optimal.'
  },
  {
    id: 'p4',
    url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop',
    title: 'Roasted to Perfection',
    desc: 'Biji kopi pilihan yang dipanggang lokal dengan penuh dedikasi.'
  },
  {
    id: 'p5',
    url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop',
    title: 'Pour Over Alchemy',
    desc: 'Metode seduh manual V60 menonjolkan cita rasa floral biji kopi.'
  },
  {
    id: 'p6',
    url: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=800&auto=format&fit=crop',
    title: 'Chilled Aesthetics',
    desc: 'Penyegar dahaga yang dibuat dari biji kopi specialty terbaik.'
  }
];

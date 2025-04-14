export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: string;
  rating: number;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

export interface Category {
  title: string;
  icon: string;
  link: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

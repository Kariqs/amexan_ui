export interface User {
  fullname: string;
  username: string;
  email: string;
  phone: number;
  occupation: string;
  password: string;
  acceptTerms: boolean;
  subscribeToNews: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Product {
  ID?: number;
  brand: string;
  name: string;
  description: string;
  price: string;
  colors: string[];
  category: string;
  Specifications?: ProductSpec[];
  Images?: ProductImage[];
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
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

export interface DecodedToken {
  user_id: string;
  email: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export interface ProductSpec {
  id?: number;
  productId: number;
  name: string;
  value: string;
}

export interface ProductImage {
  id?: number;
  productId: number;
  url: string;
  isPrimary: boolean;
}

export interface PageMetadata {
  limit: number;
  currentPage: number;
  nextPage: number;
  previousPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  total: number;
}

export interface FetchedProduct {
  metadata: PageMetadata;
  products: Product[];
}

export interface Section {
  title: string;
  description?: string;
  announcement?: string;
  products: Product[];
}

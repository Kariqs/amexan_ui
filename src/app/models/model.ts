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
  id: number;
  name: string;
  brand: string;
  description: string;
  price: string;
  rating: number;
  image: string;
}

export interface NewProduct {
  ID?: number;
  brand: string;
  name: string;
  description: string;
  price: string;
  colors: string[];
  category: string;
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
  imageUrl: string;
  isPrimary: boolean;
}

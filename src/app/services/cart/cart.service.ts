import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../models/model';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  constructor() {
    // Initialize with sample data or load from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.cartSubject.next(this.items);
    } else {
      // Sample data - in a real app, this would come from an API or user actions
      this.items = [
        {
          id: 1,
          name: 'Wireless Headphones',
          price: 99.99,
          quantity: 1,
          imageUrl: '/api/placeholder/200/200'
        },
        {
          id: 2,
          name: 'Smartphone Case',
          price: 24.99,
          quantity: 2,
          imageUrl: '/api/placeholder/200/200'
        },
        {
          id: 3,
          name: 'USB-C Cable Pack',
          price: 15.99,
          quantity: 1,
          imageUrl: '/api/placeholder/200/200'
        }
      ];
      this.updateCart();
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  addItem(item: CartItem): void {
    const existingItem = this.items.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
    
    this.updateCart();
  }

  updateItemQuantity(itemId: number, quantity: number): void {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  removeItem(itemId: number): void {
    this.items = this.items.filter(item => item.id !== itemId);
    this.updateCart();
  }

  clearCart(): void {
    this.items = [];
    this.updateCart();
  }

  private updateCart(): void {
    this.cartSubject.next([...this.items]);
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}

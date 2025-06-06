import { Component, OnInit } from '@angular/core';
import { CartItem, DecodedToken } from '../../models/model';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item.productId, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateItemQuantity(item.productId, item.quantity - 1);
    }
  }

  updateQuantity(item: CartItem): void {
    if (item.quantity < 1) {
      item.quantity = 1;
    }
    this.cartService.updateItemQuantity(item.productId, item.quantity);
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId);
  }

  getSubtotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }

  continueShopping() {
    this.router.navigate(['shop']);
  }

  onClickCheckout() {
    const token = this.authService.getToken();
    if (token) {
      this.router.navigate(['checkout']);
    } else {
      this.router.navigate(['auth', 'login']).then(() => {
        this.toaster.info('Kindly login before checking out.');
      });
    }
  }
}

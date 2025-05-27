import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartTotal!: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartTotal = this.cartService.getTotal();
  }
}

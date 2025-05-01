import { Component, Input } from '@angular/core';
import { CartItem, NewProduct, Product } from '../../../models/model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: NewProduct;

  constructor(private cartService: CartService) {}

  onAddToCart(
    productId: number,
    productName: string,
    productPrice: number,
    productQuantity: number,
    productImage: string
  ) {
    const item: CartItem = {
      id: productId,
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      imageUrl: productImage,
    };
    this.cartService.addItem(item);
  }
}

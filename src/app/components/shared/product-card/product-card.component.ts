import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem, Product } from '../../../models/model';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private cartService: CartService,
    private toaster: ToastrService
  ) {}

  onAddToCart(
    productId: number,
    productName: string,
    productPrice: number,
    productQuantity: number,
    productImage: string
  ) {
    const item: CartItem = {
      productId: productId,
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      imageUrl: productImage,
    };
    this.cartService.addItem(item);
    this.toaster.info(`${productQuantity} ${productName} added to cart.`);
  }
}

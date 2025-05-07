import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartItem, Product } from '../../../../models/model';
import { CartService } from '../../../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  @Input() product!: Product;

  constructor(
    private cartService: CartService,
    private toaster: ToastrService
  ) {}

  selectedColor: string = '';
  currentImageIndex: number = 0;

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  nextImage(): void {
    if (this.product.Images) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.product.Images.length;
    }
  }

  prevImage(): void {
    if (this.product.Images) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.product.Images.length) %
        this.product.Images.length;
    }
  }

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
    this.toaster.success(`${productQuantity} ${productName} added to cart.`);
  }
}

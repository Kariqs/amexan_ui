import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/model';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  @Input() product!: Product;

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
}

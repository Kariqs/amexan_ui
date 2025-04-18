import { Component, Input } from '@angular/core';
import { Product } from '../../../models/model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  get stars(): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < this.product.rating ? 1 : 0));
  }
}

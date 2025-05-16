import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../models/model';
import { ProductsService } from '../../../services/products/products.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

@Component({
  selector: 'app-products-section',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent {
  products!: Product[];

  constructor(
    private productsService: ProductsService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productsService.getProducts().subscribe({
      next: (fetchedProducts) => {
        this.products = fetchedProducts.products;
      },
      error: (err) => {
        this.toaster.error(err.message);
      },
    });
  }
}

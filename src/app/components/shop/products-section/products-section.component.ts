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

  pageMetadata!: {
    limit: number;
    currentPage: number;
    nextPage: number;
    previousPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    total: number;
  };
  status: 'loading' | 'success' | 'error' = 'loading';

  constructor(
    private productsService: ProductsService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  onPreviousPage(page: number, limit?: number) {
    this.fetchProducts(page, limit);
  }

  onNextPage(page: number, limit?: number) {
    this.fetchProducts(page, limit);
  }

  fetchProducts(page?: number, limit?: number) {
    this.status = 'loading';
    this.productsService.getProducts(page, limit).subscribe({
      next: (fetchedProducts) => {
        this.pageMetadata = fetchedProducts.metadata;
        this.products = fetchedProducts.products;
        this.status = 'success';
      },
      error: (err) => {
        this.toaster.error(err.message);
        this.status = 'error';
      },
    });
  }
}

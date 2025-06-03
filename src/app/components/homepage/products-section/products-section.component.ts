import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product, Section } from '../../../models/model';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ProductsService } from '../../../services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-products-section',
  imports: [
    CommonModule,
    ProductCardComponent,
    PaginationComponent,
    ModalComponent,
  ],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent implements OnInit {
  products!: Product[];
  sections!: Section[];
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
  loadingMessage: string = 'Loading Products';

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
        this.sections = [
          {
            title: 'Featured Products',
            description:
              'Discover our amazing top picks tailored for medical professionals and students',
            announcement: 'Offer! Offer! Offer!',
            products: fetchedProducts.products,
          },
          { title: 'Best Sellers', products: fetchedProducts.products },
          { title: 'New Arrivals', products: fetchedProducts.products },
        ];
      },
      error: (err) => {
        this.status = 'error';
        this.toaster.error(err.message);
      },
    });
  }
}

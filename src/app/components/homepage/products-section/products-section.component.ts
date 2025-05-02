import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/model';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ProductsService } from '../../../services/products/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-section',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent implements OnInit {
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
        this.products = fetchedProducts;
      },
      error: (err) => {
        this.toaster.error(err.message);
      },
    });
  }
}

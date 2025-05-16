import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../../models/model';
import { ProductsService } from '../../../../services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  imports: [CommonModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  status: 'loading' | 'success' | 'error' = 'loading';
  products!: Product[];

  constructor(
    private productService: ProductsService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (fetchedProducts) => {
        this.status = 'success';
        this.products = fetchedProducts.products;
      },
      error: (err) => {
        this.status = 'error';
        this.toaster.error(err.message);
      },
    });
  }

  onCreateProduct() {
    this.router.navigate(['admin', 'product-manager', 'create-product']);
  }
}

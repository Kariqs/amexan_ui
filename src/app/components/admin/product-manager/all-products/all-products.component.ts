import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PageMetadata, Product } from '../../../../models/model';
import { ProductsService } from '../../../../services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-all-products',
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  limit: string = '';
  status: 'loading' | 'success' | 'error' = 'loading';
  products!: Product[];
  numberOfRecords: number[] = [3, 5, 10, 15, 20, 25, 50, 100];
  pageMetadata!: PageMetadata;
  deletingProductId: number | null = null;

  constructor(
    private productService: ProductsService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.status = 'loading';
    this.productService.getProducts().subscribe({
      next: (fetchedProducts) => {
        this.status = 'success';
        this.pageMetadata = fetchedProducts.metadata;
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

  onSelectChange(event: Event, page?: number) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.status = 'loading';
    this.productService.getProducts(undefined, +selectedValue).subscribe({
      next: (fetchedProducts) => {
        this.status = 'success';
        this.pageMetadata = this.pageMetadata;
        this.products = fetchedProducts.products;
      },
      error: (err) => {
        this.status = 'error';
        this.toaster.error(err.message);
      },
    });
  }

  updateProduct(productId: number) {
    this.router.navigate(['admin', 'product-manager', 'create-product'], {
      queryParams: { edit: true, id: productId },
    });
  }

  deleteProduct(productId: number) {
    this.deletingProductId = productId;
    this.productService.deleteProduct(productId).subscribe({
      next: (response) => {
        this.router.navigate(['admin', 'product-manager']).then(() => {
          window.location.reload();
          this.toaster.info(response.message);
          this.deletingProductId = null;
        });
      },
      error: (err) => {
        this.toaster.error(err.message);
        this.deletingProductId = null;
      },
    });
  }
}

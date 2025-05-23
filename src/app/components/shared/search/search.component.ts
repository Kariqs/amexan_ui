import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product, Section } from '../../../models/model';
import { ProductsService } from '../../../services/products/products.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-search',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, OnDestroy {
  searchedProducts!: Product[];
  sections!: Section[];
  searchTerm: string = '';
  status: 'loading' | 'success' | 'error' = 'loading';
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.searchTerm = params['q'] || '';
        if (!this.searchTerm) {
          this.router.navigate(['/']);
          return;
        }
        this.fetchSearchedProduct(this.searchTerm);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchSearchedProduct(searchTerm: string): void {
    this.status = 'loading';

    this.productsService
      .searchProduct(searchTerm)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (fetchedProduct) => {
          this.status = 'success';
          this.sections = [
            { title: 'Products', products: fetchedProduct.products },
          ];
        },
        error: (err) => {
          this.status = 'error';
          console.error('Search failed:', err);
        },
      });
  }
}

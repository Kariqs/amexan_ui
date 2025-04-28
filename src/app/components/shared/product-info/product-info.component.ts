import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { DetailsComponent } from './details/details.component';
import { SpecificationsComponent } from './specifications/specifications.component';
import { ProductsService } from '../../../services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewProduct, ProductSpec } from '../../../models/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-info',
  imports: [
    FooterComponent,
    DetailsComponent,
    SpecificationsComponent,
    CommonModule,
  ],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent implements OnInit {
  product!: NewProduct;
  productSpecifications!: ProductSpec[];
  productImage!: string;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.fetchProduct(+productId);
  }

  fetchProduct(productId: number) {
    this.productService.getProductById(productId).subscribe({
      next: (fetchedProduct) => {
        this.product = fetchedProduct;
        if (fetchedProduct.Specifications) {
          this.productSpecifications = fetchedProduct.Specifications;
        } else {
          this.productSpecifications = [];
        }

        if (fetchedProduct.Images) {
          this.productImage = fetchedProduct.Images[0].url;
        } else {
          this.productImage = '';
        }
      },
      error: (error) => {
        this.toaster.error(error.message);
      },
    });
  }
}

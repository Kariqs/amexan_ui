import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../../../models/model';
import { ProductsService } from '../../../../services/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  productForm!: FormGroup;
  isSubmitting = false;
  isEditMode = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  checkEditMode(): void {
    this.route.queryParams.subscribe((params) => {
      const edit = params['edit'] === 'true';
      const id = +params['id'];

      if (edit && id) {
        this.isEditMode = true;
        this.productId = id;
        this.fetchProduct(id);
      } else {
        this.addColor();
      }
    });
  }

  fetchProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product: Product) => {
        this.populateForm(product);
      },
      error: (err) => {
        this.toaster.error('Failed to fetch product.');
      },
    });
  }

  populateForm(product: Product): void {
    this.productForm.patchValue({
      brand: product.brand,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
    });

    // Clear existing colors and set new ones
    this.colorsArray.clear();
    if (product.colors && product.colors.length) {
      product.colors.forEach((color) => {
        this.colorsArray.push(this.fb.control(color, Validators.required));
      });
    } else {
      this.addColor();
    }
  }

  initForm(): void {
    this.productForm = this.fb.group({
      brand: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      colors: this.fb.array([], Validators.minLength(1)),
      // Add other basic product fields as needed
    });
  }
  get colorsArray(): FormArray {
    return this.productForm.get('colors') as FormArray;
  }

  addColor(): void {
    this.colorsArray.push(this.fb.control(null, Validators.required));
  }

  removeColor(index: number): void {
    if (this.colorsArray.length > 1) {
      this.colorsArray.removeAt(index);
    }
  }

  updateColor(index: number, event: any): void {
    const colorValue = event.target.value;
    this.colorsArray.at(index).setValue(colorValue);
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const productData: Product = this.productForm.value;

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, productData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.toaster.info('Product updated successfully.');
          this.router.navigate(['admin', 'product-manager']);
        },
        error: () => {
          this.isSubmitting = false;
          this.toaster.error('Failed to update product.');
        },
      });
    } else {
      this.productService.createProduct(productData).subscribe({
        next: (savedProduct) => {
          this.isSubmitting = false;
          this.router
            .navigate(['admin', 'product-manager', 'assets', savedProduct.ID])
            .then(() => {
              this.toaster.info('Product created successfully.');
            });
        },
        error: () => {
          this.isSubmitting = false;
          this.toaster.error('Failed to create product.');
        },
      });
    }
  }
}

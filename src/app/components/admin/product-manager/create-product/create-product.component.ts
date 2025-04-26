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
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.addColor();
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
    console.log(productData);

    this.productService.createProduct(productData).subscribe({
      next: (savedProduct) => {
        this.isSubmitting = false;
        // Navigate to the next step, passing the product ID
        this.router
          .navigate(['admin', 'product-manager', 'assets', savedProduct.ID])
          .then(() => {
            this.toaster.success('Product details saved successfully.');
          });
      },
      error: (error) => {
        this.isSubmitting = false;
        this.toaster.error('Unable to save product details.');
      },
    });
  }
}

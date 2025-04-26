import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductSpec } from '../../../../../models/model';
import { ProductsService } from '../../../../../services/products/products.service';
import { ObjectURLPipe } from '../../../../../pipes/image-url.pipe';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-assets',
  imports: [ReactiveFormsModule, ObjectURLPipe, CommonModule, RouterModule],
  templateUrl: './product-assets.component.html',
  styleUrl: './product-assets.component.css',
})
export class ProductAssetsComponent {
  productId!: number;
  specsForm!: FormGroup;
  selectedImages: File[] = [];
  isSubmitting = false;
  uploadProgress = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    // Get the product ID from the route
    this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      if (!this.productId) {
        // Handle invalid product ID
        this.router.navigate(['/products']);
        return;
      }

      this.initForm();
    });
  }

  initForm(): void {
    this.specsForm = this.fb.group({
      specs: this.fb.array([this.createSpecGroup()]),
    });
  }

  // Helper method to create a new spec form group
  createSpecGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  // Getter for the specs FormArray
  get specs(): FormArray {
    return this.specsForm.get('specs') as FormArray;
  }

  // Add a new spec field
  addSpec(): void {
    this.specs.push(this.createSpecGroup());
  }

  // Remove a spec field
  removeSpec(index: number): void {
    this.specs.removeAt(index);
  }

  // Handle file selection
  onImagesSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      this.selectedImages = Array.from(files);
    }
  }

  // Submit the form
  onSubmit(): void {
    if (this.specsForm.invalid) {
      this.specsForm.markAllAsTouched();
      return;
    }

    console.log(this.specsForm.value);

    this.isSubmitting = true;

    // First, save all specs
    const specs: ProductSpec[] = this.specs.value.map((spec: any) => ({
      ...spec,
      productId: this.productId,
    }));

    // Use Promise.all to save all specs in parallel
    const specPromises = specs.map((spec) =>
      firstValueFrom(this.productService.addProductSpec(spec))
    );

    Promise.all(specPromises)
      .then(() => {
        // After specs are saved, upload images
        return this.uploadImages();
      })
      .then(() => {
        this.isSubmitting = false;
        // Navigate to product detail or list page
        this.router.navigate(['/products', this.productId]);
      })
      .catch((error) => {
        this.isSubmitting = false;
        console.error('Error saving product assets:', error);
        // Handle error appropriately
      });
  }

  // Upload images helper method
  private uploadImages(): Promise<any> {
    if (!this.selectedImages.length) {
      return Promise.resolve();
    }

    const uploadPromises = this.selectedImages.map((image, index) => {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('isPrimary', index === 0 ? 'true' : 'false');

      return firstValueFrom(this.productService.uploadProductImage(formData));
    });

    return Promise.all(uploadPromises);
  }
}

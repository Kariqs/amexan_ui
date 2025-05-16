import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import {
  FetchedProduct,
  Product,
  ProductImage,
  ProductSpec,
} from '../../models/model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  createProduct(productData: Product): Observable<Product> {
    return this.http
      .post<Product>(`${this.apiUrl}/product`, productData)
      .pipe(catchError((error) => this.authService.handleError(error)));
  }

  addProductSpec(spec: ProductSpec): Observable<ProductSpec> {
    return this.http
      .post<ProductSpec>(`${this.apiUrl}/product-specs`, spec)
      .pipe(catchError((error) => this.authService.handleError(error)));
  }

  uploadProductImage(formData: FormData): Observable<ProductImage> {
    return this.http
      .post<ProductImage>(`${this.apiUrl}/product-images`, formData)
      .pipe(catchError((error) => this.authService.handleError(error)));
  }

  getProducts(): Observable<FetchedProduct> {
    return this.http
      .get<FetchedProduct>(`${this.apiUrl}/product`)
      .pipe(catchError((error) => this.authService.handleError(error)));
  }

  getProductById(productId: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.apiUrl}/product/${productId}`)
      .pipe(catchError((error) => this.authService.handleError(error)));
  }
}

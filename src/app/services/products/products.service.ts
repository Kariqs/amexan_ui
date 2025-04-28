import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  NewProduct,
  Product,
  ProductImage,
  ProductSpec,
} from '../../models/model';
import { environment } from '../../../environments/environment.development';
import { catchError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  createProduct(productData: Product): Observable<NewProduct> {
    return this.http
      .post<NewProduct>(`${this.apiUrl}/product`, productData)
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

  getProducts(): Observable<NewProduct[]> {
    return this.http
      .get<NewProduct[]>(`${this.apiUrl}/product`)
      .pipe(catchError((error) => this.authService.handleError(error)));
  }

  getProductById(productId: number): Observable<NewProduct> {
    return this.http
      .get<NewProduct>(`${this.apiUrl}/product/${productId}`)
      .pipe(catchError((error) => this.authService.handleError(error)));
  }
}

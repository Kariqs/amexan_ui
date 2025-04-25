import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewProduct, Product } from '../../models/model';
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
}

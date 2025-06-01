import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Order, PageMetadata } from '../../models/model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = environment.apiUrl;

  constructor(private authService: AuthService, private http: HttpClient) {}

  getOrdersByCustomerId(userId: number): Observable<{ orders: Order[] }> {
    return this.http
      .get<{ orders: Order[] }>(`${this.apiUrl}/user/${userId}/orders`)
      .pipe(catchError((error) => this.authService.handleError(error)));
  }

  getOrdersById(orderId: number): Observable<{ order: Order }> {
    return this.http
      .get<{ order: Order }>(`${this.apiUrl}/order/${orderId}`)
      .pipe(catchError((error) => this.authService.handleError(error)));
  }

  getOrders(
    page?: number,
    limit?: number
  ): Observable<{ metadata: PageMetadata; orders: Order[] }> {
    let params = new HttpParams();
    if (page != null) params = params.set('page', page.toString());
    if (limit != null) params = params.set('limit', limit.toString());

    return this.http
      .get<{ metadata: PageMetadata; orders: Order[] }>(
        `${this.apiUrl}/order`,
        { params }
      )
      .pipe(catchError((error) => this.authService.handleError(error)));
  }
}

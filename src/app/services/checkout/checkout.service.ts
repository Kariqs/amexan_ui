import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Order } from '../../models/model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  createOrder(
    orderInfo: Order
  ): Observable<{ message: string; redirect_url: string; order_id: number }> {
    return this.http
      .post<{ message: string; redirect_url: string; order_id: number }>(
        `${this.apiUrl}/order`,
        orderInfo
      )
      .pipe(catchError((error) => this.authService.handleError(error)));
  }

  checkPaymentStatus(
    orderTrackingId: string
  ): Observable<{ paymentStatus: string }> {
    return this.http
      .get<{ paymentStatus: string }>(
        `${this.apiUrl}/paymentstatus?OrderTrackingId=${orderTrackingId}`
      )
      .pipe(catchError((error) => this.authService.handleError(error)));
  }
}

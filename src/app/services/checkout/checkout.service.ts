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

  createOrder(orderInfo: Order) {
    return this.http
      .post(`${this.apiUrl}/order`, orderInfo)
      .pipe(catchError((error) => this.authService.handleError(error)));
  }
}

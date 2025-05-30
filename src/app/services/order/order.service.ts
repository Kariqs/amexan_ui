import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Order } from '../../models/model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl = environment.apiUrl;

  constructor(private authService: AuthService, private http: HttpClient) {}

  getOrdersByCustomerId(userId: number): Observable<{ orders: Order[] }> {
    return this.http
      .get<{ orders: Order[] }>(`${this.apiUrl}/order/${userId}`)
      .pipe(catchError((error) => this.authService.handleError(error)));
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/model';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;
  signup(signupData: User): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${this.apiUrl}/auth/signup`, signupData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';

    if (error.error) {
      if (error.error.message) {
        errorMsg = error.error.message; // Primary message
      }
      if (error.error.details) {
        errorMsg += ` - ${error.error.details}`; // Additional details
      }
    }

    return throwError(() => new Error(errorMsg));
  }
}

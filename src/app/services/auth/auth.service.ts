import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DecodedToken, LoginData, User } from '../../models/model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private tokenKey: string = 'token';

  apiUrl = environment.apiUrl;
  signup(signupData: User): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${this.apiUrl}/auth/signup`, signupData)
      .pipe(catchError((error) => this.handleError(error)));
  }

  verifyEmail(activationToken: string) {
    return this.http
      .post(`${this.apiUrl}/auth/verify-email/${activationToken}`, null)
      .pipe(catchError((error) => this.handleError(error)));
  }

  login(loginData: LoginData): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/auth/login`, loginData)
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem(this.tokenKey, response.token);
          }
        }),
        catchError((error) => this.handleError(error))
      );
  }

  forgotPassword(forgotPasswordData: { email: string }) {
    return this.http
      .post(`${this.apiUrl}/auth/forgot-password`, forgotPasswordData)
      .pipe(catchError((error) => this.handleError(error)));
  }

  resetPassword(resetToken: string, resetPasswordData: { password: string }) {
    return this.http
      .post(
        `${this.apiUrl}/auth/reset-password/${resetToken}`,
        resetPasswordData
      )
      .pipe(catchError((error) => this.handleError(error)));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    window.location.reload();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserFromToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded;
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate(['auth', 'login']);
    }

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

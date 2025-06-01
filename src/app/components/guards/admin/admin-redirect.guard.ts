import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../../models/model';

export const adminRedirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp < currentTime) {
      router.navigate(['/login']);
      return false;
    }

    if (decoded.role === 'admin') {
      router.navigate(['admin']);
      return false;
    }

    return true;
  } catch (err) {
    router.navigate(['/login']);
    return false;
  }
};

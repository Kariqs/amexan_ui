import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../../models/model';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    return router.createUrlTree(['/auth/login']);
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.role === 'admin') {
      return true;
    } else {
      return router.createUrlTree(['/']);
    }
  } catch (e) {
    return router.createUrlTree(['/auth/login']);
  }
};

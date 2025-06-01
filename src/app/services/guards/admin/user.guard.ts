import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../../models/model';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    return true;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.role === 'admin') {
      return router.createUrlTree(['/admin']);
    } else {
      return true;
    }
  } catch (e) {
    return true;
  }
};

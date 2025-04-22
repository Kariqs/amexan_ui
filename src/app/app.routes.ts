import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductInfoComponent } from './components/shared/product-info/product-info.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './components/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'Home - Amexan' },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    title: 'Admin - Amexan',
  },
  { path: 'shop', component: ShopComponent, title: 'Shop - Amexan' },
  { path: 'product/:id', component: ProductInfoComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'signup', component: SignupComponent, title: 'Signup - Amexan' },
      { path: 'login', component: LoginComponent, title: 'Login - Amexan' },
    ],
  },
];

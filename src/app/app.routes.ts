import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductInfoComponent } from './components/shared/product-info/product-info.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'Home - AMEXAN' },
  { path: 'shop', component: ShopComponent, title: 'Shop - AMEXAN' },
  { path: 'product/:id', component: ProductInfoComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'signup', component: SignupComponent, title: 'Signup - AMEXAN' },
      { path: 'login', component: LoginComponent, title: 'Login - AMEXAN' },
    ],
  },
];

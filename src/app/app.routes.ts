import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductInfoComponent } from './components/shared/product-info/product-info.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './components/guards/auth.guard';
import { ProductManagerComponent } from './components/admin/product-manager/product-manager.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AllProductsComponent } from './components/admin/product-manager/all-products/all-products.component';
import { CreateProductComponent } from './components/admin/product-manager/create-product/create-product.component';
import { ProductAssetsComponent } from './components/admin/product-manager/create-product/product-assets/product-assets.component';
import { CartComponent } from './components/cart/cart.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { SearchComponent } from './components/shared/search/search.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderComponent } from './components/order/order.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'Home - Amexan' },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    title: 'Admin - Amexan',
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: 'Dashboard',
      },
      {
        path: 'product-manager',
        component: ProductManagerComponent,
        title: 'Manage Products',
        children: [
          { path: '', component: AllProductsComponent },
          { path: 'create-product', component: CreateProductComponent },
          { path: 'assets/:id', component: ProductAssetsComponent },
        ],
      },
    ],
  },
  { path: 'shop', component: ShopComponent, title: 'Shop - Amexan' },
  { path: 'product/:id', component: ProductInfoComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'signup', component: SignupComponent, title: 'Signup - Amexan' },
      {
        path: 'verify-email',
        component: VerifyEmailComponent,
        title: 'Verify - Email - Amexan',
      },
      { path: 'login', component: LoginComponent, title: 'Login - Amexan' },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'Forgot-Password - Amexan',
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: 'Reset-Password - Amexan',
      },
    ],
  },
  { path: 'search', component: SearchComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order', component: OrderComponent },
];

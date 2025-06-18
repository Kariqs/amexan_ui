import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductInfoComponent } from './components/shared/product-info/product-info.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './services/guards/auth.guard';
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
import { OrdersManagerComponent } from './components/admin/orders-manager/orders-manager.component';
import { AllOrdersComponent } from './components/admin/orders-manager/all-orders/all-orders.component';
import { SingleOrderComponent } from './components/admin/orders-manager/single-order/single-order.component';
import { userGuard } from './services/guards/admin/user.guard';
import { adminGuard } from './services/guards/admin/admin.guard';
import { PaymentStatusComponent } from './components/checkout/payment-status/payment-status.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [userGuard],
    component: HomepageComponent,
    title: 'Home - Amexan',
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, adminGuard],
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
      {
        path: 'order-manager',
        component: OrdersManagerComponent,
        title: 'Order Management',
        children: [
          {
            path: '',
            component: AllOrdersComponent,
          },
          {
            path: 'order/:orderId',
            component: SingleOrderComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'shop',
    canActivate: [userGuard],
    component: ShopComponent,
    title: 'Shop - Amexan',
  },
  { path: 'product/:id', component: ProductInfoComponent },
  {
    path: 'cart',
    canActivate: [userGuard],
    component: CartComponent,
    title: 'Cart',
  },
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
  {
    path: 'search',
    canActivate: [userGuard],
    component: SearchComponent,
    title: 'Search',
  },
  {
    path: 'checkout',
    canActivate: [authGuard, userGuard],
    component: CheckoutComponent,
    title: 'Checkout',
  },
  {
    path: 'order',
    title: 'My Orders',
    canActivate: [authGuard, userGuard],
    component: OrderComponent,
  },
  {
    path: 'paymentstatus',
    title: 'Payment Status',
    canActivate: [authGuard, userGuard],
    component: PaymentStatusComponent,
  },
];

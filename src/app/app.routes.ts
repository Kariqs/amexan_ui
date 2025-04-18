import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductInfoComponent } from './components/shared/product-info/product-info.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'shop', component: ShopComponent, title: 'Shop - AMEXAN' },
  { path: 'product/:id', component: ProductInfoComponent },
];

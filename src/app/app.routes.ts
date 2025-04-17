import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ShopComponent } from './components/shop/shop.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'shop', component: ShopComponent },
];

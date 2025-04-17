import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { MainSectionComponent } from '../shop/main-section/main-section.component';
import { ProductsSectionComponent } from '../shop/products-section/products-section.component';

@Component({
  selector: 'app-shop',
  imports: [FooterComponent, MainSectionComponent, ProductsSectionComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {}

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  email: string = 'support@medcatalyst.com';
  phone: string = '(123) 456-7890';
  address: string = '123 Medical Lane, Health City';
  year: number = new Date().getFullYear();
}

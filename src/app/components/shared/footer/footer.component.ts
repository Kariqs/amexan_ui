import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  email: string = 'support@medcatalyst.com';
  phone: string = '(123) 456-7890';
  address: string = '123 Medical Lane, Health City';
  year: number = new Date().getFullYear();
}

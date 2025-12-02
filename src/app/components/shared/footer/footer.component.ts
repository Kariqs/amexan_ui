import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  email: string = 'support@freeridgehum.co.ke';
  phone: string = '+254712439166';
  address: string = 'Freeridge Hub, Kenya.';
  year: number = new Date().getFullYear();
}

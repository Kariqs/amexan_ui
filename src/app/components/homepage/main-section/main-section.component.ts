import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-section',
  imports: [],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css',
})
export class MainSectionComponent {
  constructor(private router: Router) {}
  onShopNowClick() {
    this.router.navigate(['shop']);
  }
}

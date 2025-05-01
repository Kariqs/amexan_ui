import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../../models/model';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  accountNavs: { name: string; link: string }[] = [
    { name: 'Sign Up', link: 'auth/signup' },
    { name: 'Sign In', link: 'auth/login' },
  ];

  sideBarNavs: { name: string; link: string }[] = [
    { name: 'Home', link: '' },
    { name: 'Student Packages', link: '' },
    { name: 'Intern Packages', link: '' },
    { name: 'Medical Wears', link: '' },
    { name: 'Diagnostic Equipments', link: '' },
    { name: 'Medical Equipments', link: '' },
    { name: 'Surgical Equipments', link: '' },
    { name: 'Laboratory Equipments', link: '' },
    { name: 'Imaging Products', link: '' },
    { name: 'Shop Now', link: 'shop' },
    { name: 'Call Us', link: '' },
  ];

  adminNavs: { name: string; link: string }[] = [
    { name: 'Dashboard', link: 'admin' },
    { name: 'Manage Products', link: 'admin/product-manager' },
    { name: 'Manage Orders', link: 'admin/order-manager' },
    { name: 'Manage Customers', link: 'admin/customer-manager' },
    { name: 'Payment Dashboard', link: 'admin/payment-manager' },
  ];

  desktopNavs: { name: string; link: string }[] = [
    { name: 'Home', link: '' },
    { name: 'Shop', link: 'shop' },
    { name: 'Blog', link: '' },
    { name: 'About Us', link: '' },
  ];

  showSideDrawer: boolean = false;
  showMore: boolean = false;
  showMyAccount: boolean = false;
  authenticated!: boolean;
  username!: string;
  isAdmin: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authenticated = this.authService.isAuthenticated();
    this.username = this.getUsername();
  }

  toggleMore(): void {
    this.showMore = !this.showMore;
  }

  toggleMyAccount(): void {
    this.showMyAccount = !this.showMyAccount;
  }
  toggleSidebar(): void {
    this.showSideDrawer = !this.showSideDrawer;
  }

  getUsername(): string {
    const token = this.authService.getToken();
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.role === 'admin') {
        this.isAdmin = true;
      }
      return decoded.username || decoded.email || 'Unknown';
    }
    return 'Guest';
  }

  onLogout() {
    this.authService.logout();
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    const dropdown =
      this.elementRef.nativeElement.querySelector('.more-dropdown');
    const dropdownButton =
      this.elementRef.nativeElement.querySelector('.more-button');

    if (dropdown && dropdownButton) {
      if (
        !dropdown.contains(targetElement) &&
        !dropdownButton.contains(targetElement)
      ) {
        this.showMore = false;
      }
    }
  }

  getCartTotalItems(): number {
    return this.cartService.getTotalItems();
  }
}

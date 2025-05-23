import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';
import { ThemeService } from '../../../services/theme/theme.service';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../../models/model';

interface NavItem {
  name: string;
  link: string;
}

interface UserState {
  authenticated: boolean;
  username: string;
  isAdmin: boolean;
}

interface UIState {
  showSideDrawer: boolean;
  showMore: boolean;
  showMyAccount: boolean;
  showMobileSearch: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Navigation configurations
  private readonly navigationConfig = {
    account: [
      { name: 'Sign Up', link: 'auth/signup' },
      { name: 'Sign In', link: 'auth/login' },
    ],
    sidebar: [
      { name: 'Home', link: '' },
      { name: 'Student Packages', link: 'student-packages' },
      { name: 'Intern Packages', link: 'intern-packages' },
      { name: 'Medical Wears', link: 'medical-wears' },
      { name: 'Diagnostic Equipments', link: 'diagnostic-equipments' },
      { name: 'Medical Equipments', link: 'medical-equipments' },
      { name: 'Surgical Equipments', link: 'surgical-equipments' },
      { name: 'Laboratory Equipments', link: 'laboratory-equipments' },
      { name: 'Imaging Products', link: 'imaging-products' },
      { name: 'Shop Now', link: 'shop' },
      { name: 'Contact Us', link: 'contact' },
    ],
    admin: [
      { name: 'Dashboard', link: 'admin' },
      { name: 'Manage Products', link: 'admin/product-manager' },
      { name: 'Manage Orders', link: 'admin/order-manager' },
      { name: 'Manage Customers', link: 'admin/customer-manager' },
      { name: 'Payment Dashboard', link: 'admin/payment-manager' },
    ],
    desktop: [
      { name: 'Home', link: '' },
      { name: 'Shop', link: 'shop' },
      { name: 'Blog', link: 'blog' },
      { name: 'About Us', link: 'about' },
    ],
  };

  // Component state
  userState: UserState = {
    authenticated: false,
    username: 'Guest',
    isAdmin: false,
  };

  uiState: UIState = {
    showSideDrawer: false,
    showMore: false,
    showMyAccount: false,
    showMobileSearch: false,
  };

  searchTerm: string = '';
  cartItemCount: number = 0;

  // Getters for navigation arrays
  get accountNavs(): NavItem[] {
    return this.navigationConfig.account;
  }
  get sideBarNavs(): NavItem[] {
    return this.navigationConfig.sidebar;
  }
  get adminNavs(): NavItem[] {
    return this.navigationConfig.admin;
  }
  get desktopNavs(): NavItem[] {
    return this.navigationConfig.desktop;
  }

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private cartService: CartService,
    public themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeUserState();
    this.subscribeToCartChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeUserState(): void {
    this.userState.authenticated = this.authService.isAuthenticated();
    this.setUserDetails();
  }

  private setUserDetails(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        this.userState.isAdmin = decoded.role === 'admin';
        this.userState.username =
          decoded.username || decoded.email || 'Unknown';
      } catch (error) {
        console.error('Error decoding JWT token:', error);
        this.userState.username = 'Guest';
      }
    }
  }

  private subscribeToCartChanges(): void {
    this.cartService.cart$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cartItemCount = this.cartService.getTotalItems();
    });
  }

  // UI Toggle Methods
  toggleSidebar(): void {
    this.uiState.showSideDrawer = !this.uiState.showSideDrawer;
    this.closeOtherDropdowns('sidebar');
  }

  toggleMore(): void {
    this.uiState.showMore = !this.uiState.showMore;
    this.closeOtherDropdowns('more');
  }

  toggleMyAccount(): void {
    this.uiState.showMyAccount = !this.uiState.showMyAccount;
    this.closeOtherDropdowns('account');
  }

  toggleMobileSearch(): void {
    this.uiState.showMobileSearch = !this.uiState.showMobileSearch;
    this.closeOtherDropdowns('search');
  }

  private closeOtherDropdowns(except?: string): void {
    if (except !== 'more') this.uiState.showMore = false;
    if (except !== 'account') this.uiState.showMyAccount = false;
    if (except !== 'search') this.uiState.showMobileSearch = false;
    if (except !== 'sidebar') this.uiState.showSideDrawer = false;
  }

  // Search functionality
  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.router.navigate([''], { relativeTo: this.route });
      return;
    }

    this.router.navigate(['search'], {
      queryParams: { q: this.searchTerm.trim() },
    });

    // Close mobile search on search
    this.uiState.showMobileSearch = false;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.router.navigate([''], { relativeTo: this.route });
  }

  // Authentication methods
  onLogout(): void {
    this.authService.logout();
    this.userState = {
      authenticated: false,
      username: 'Guest',
      isAdmin: false,
    };
    this.closeAllDropdowns();
  }

  private closeAllDropdowns(): void {
    this.uiState = {
      showSideDrawer: false,
      showMore: false,
      showMyAccount: false,
      showMobileSearch: false,
    };
  }

  // Cart methods
  getCartTotalItems(): number {
    return this.cartItemCount;
  }

  // Click outside handler
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    if (!this.elementRef.nativeElement.contains(targetElement)) {
      this.closeAllDropdowns();
    }
  }

  // Keyboard event handlers
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    this.closeAllDropdowns();
  }

  // Utility methods for template
  get isDarkMode(): boolean {
    return this.themeService.darkMode();
  }

  get themeToggleText(): string {
    return this.isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
  }

  onLogoClick() {
    this.router.navigate(['/']);
  }
}

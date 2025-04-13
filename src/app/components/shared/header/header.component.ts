import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
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
    { name: 'Shop Now', link: '' },
    { name: 'Call Us', link: '' },
  ];

  // Navigation items for desktop menu
  desktopNavs: { name: string; link: string }[] = [
    { name: 'Home', link: '' },
    { name: 'Shop', link: '' },
    { name: 'Blog', link: '' },
    { name: 'About Us', link: '' }
  ];

  // Dropdown menu items
  moreItems: { name: string; link: string }[] = [
    { name: 'Blog', link: '' },
    { name: 'Careers', link: '' },
    { name: 'Contact', link: '' }
  ];

  showSideDrawer: boolean = false;
  showMore: boolean = false;

  constructor(private elementRef: ElementRef) {}

  // Toggle the dropdown menu
  toggleMore(): void {
    this.showMore = !this.showMore;
  }

  // Toggle the mobile sidebar
  toggleSidebar(): void {
    this.showSideDrawer = !this.showSideDrawer;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    const dropdown = this.elementRef.nativeElement.querySelector('.more-dropdown');
    const dropdownButton = this.elementRef.nativeElement.querySelector('.more-button');

    if (dropdown && dropdownButton) {
      if (!dropdown.contains(targetElement) && !dropdownButton.contains(targetElement)) {
        this.showMore = false;
      }
    }
  }
}
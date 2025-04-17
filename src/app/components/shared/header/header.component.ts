import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    { name: 'Shop Now', link: 'shop' },
    { name: 'Call Us', link: '' },
  ];

  desktopNavs: { name: string; link: string }[] = [
    { name: 'Home', link: '' },
    { name: 'Shop', link: 'shop' },
    { name: 'Blog', link: '' },
    { name: 'About Us', link: '' },
  ];

  showSideDrawer: boolean = false;
  showMore: boolean = false;

  constructor(private elementRef: ElementRef) {}

  toggleMore(): void {
    this.showMore = !this.showMore;
  }

  toggleSidebar(): void {
    this.showSideDrawer = !this.showSideDrawer;
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
}

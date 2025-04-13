import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Category } from '../../../models/model';

@Component({
  selector: 'app-categories-section',
  imports: [CommonModule, RouterModule],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.css',
})
export class CategoriesSectionComponent {
  categories: Category[] = [
    {
      title: 'Student Packages',
      image: 'assets/images/student-packages.png',
      link: '/student-packages',
    },
    {
      title: 'Intern Packages',
      image: 'assets/images/intern-packages.png',
      link: '/intern-packages',
    },
    {
      title: 'Diagnostic Equipment',
      image: 'assets/images/diagnostic-equipment.png',
      link: '/diagnostic-equipment',
    },
    {
      title: 'Medical Equipment',
      image: 'assets/images/medical-equipment.png',
      link: '/medical-equipment',
    },
    {
      title: 'Surgical Equipment',
      image: 'assets/images/surgical-equipment.png',
      link: '/surgical-equipment',
    },
    {
      title: 'Laboratory Equipment',
      image: 'assets/images/laboratory-equipment.png',
      link: '/laboratory-equipment',
    },
    {
      title: 'Imaging Products',
      image: 'assets/images/imaging-products.png',
      link: '/imaging-products',
    },
  ];
}

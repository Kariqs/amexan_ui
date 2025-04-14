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
      icon: 'fas fa-graduation-cap fa-2x',
      link: '/student-packages',
    },
    {
      title: 'Intern Packages',
      icon: 'fas fa-user-tie fa-2x',
      link: '/intern-packages',
    },
    {
      title: 'Diagnostic Equipment',
      icon: 'fas fa-stethoscope fa-2x',
      link: '/diagnostic-equipment',
    },
    {
      title: 'Medical Equipment',
      icon: 'fas fa-capsules fa-2x',
      link: '/medical-equipment',
    },
    {
      title: 'Surgical Equipment',
      icon: 'fas fa-user-md fa-2x',
      link: '/surgical-equipment',
    },
    {
      title: 'Laboratory Equipment',
      icon: 'fas fa-vial fa-2x',
      link: '/laboratory-equipment',
    },
    {
      title: 'Imaging Products',
      icon: 'fas fa-x-ray fa-2x',
      link: '/imaging-products',
    },
  ];
}

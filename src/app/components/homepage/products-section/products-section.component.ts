import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../../models/model';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";

@Component({
  selector: 'app-products-section',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent {
  featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Stethoscope',
      brand: 'Littmann Classic III Stethoscopes',
      description:
        'Short description of the product goes here. Highlight the key features.',
      price: '700',
      rating: 5,
      image:
        'https://img.freepik.com/free-psd/blue-stethoscope-medical-instrument-auscultation_191095-80856.jpg?ga=GA1.1.588198607.1743692197&semt=ais_hybrid&w=740',
    },
    {
      id: 2,
      name: 'Stethoscope',
      brand: 'Littmann Classic III Stethoscopes',
      description:
        'Short description of the product goes here. Highlight the key features.',
      price: '700',
      rating: 5,
      image:
        'https://img.freepik.com/free-psd/blue-stethoscope-medical-instrument-auscultation_191095-80856.jpg?ga=GA1.1.588198607.1743692197&semt=ais_hybrid&w=740',
    },
    {
      id: 3,
      name: 'Stethoscope',
      brand: 'Littmann Classic III Stethoscopes',
      description:
        'Short description of the product goes here. Highlight the key features.',
      price: '700',
      rating: 5,
      image:
        'https://img.freepik.com/free-psd/blue-stethoscope-medical-instrument-auscultation_191095-80856.jpg?ga=GA1.1.588198607.1743692197&semt=ais_hybrid&w=740',
    },
  ];

  bestSellers: Product[] = [
    {
      id: 4,
      name: 'Stethoscope',
      brand: 'Littmann Classic III Stethoscopes',
      description:
        'Short description of the product goes here. Highlight the key features.',
      price: '700',
      rating: 5,
      image:
        'https://img.freepik.com/free-psd/blue-stethoscope-medical-instrument-auscultation_191095-80856.jpg?ga=GA1.1.588198607.1743692197&semt=ais_hybrid&w=740',
    },
    {
      id: 5,
      name: 'Stethoscope',
      brand: 'Littmann Classic III Stethoscopes',
      description:
        'Short description of the product goes here. Highlight the key features.',
      price: '700',
      rating: 5,
      image:
        'https://img.freepik.com/free-psd/blue-stethoscope-medical-instrument-auscultation_191095-80856.jpg?ga=GA1.1.588198607.1743692197&semt=ais_hybrid&w=740',
    },
    {
      id: 6,
      name: 'Stethoscope',
      brand: 'Littmann Classic III Stethoscopes',
      description:
        'Short description of the product goes here. Highlight the key features.',
      price: '700',
      rating: 5,
      image:
        'https://img.freepik.com/free-psd/blue-stethoscope-medical-instrument-auscultation_191095-80856.jpg?ga=GA1.1.588198607.1743692197&semt=ais_hybrid&w=740',
    },
  ];

  newArrivals: Product[] = [
    {
      id: 7,
      name: 'Stethoscope',
      brand: 'Littmann Classic III Stethoscopes',
      description:
        'Short description of the product goes here. Highlight the key features.',
      price: '700',
      rating: 5,
      image:
        'https://img.freepik.com/free-psd/blue-stethoscope-medical-instrument-auscultation_191095-80856.jpg?ga=GA1.1.588198607.1743692197&semt=ais_hybrid&w=740',
    },
    {
      id: 8,
      name: 'Stethoscope',
      brand: 'Littmann Classic III Stethoscopes',
      description:
        'Short description of the product goes here. Highlight the key features.',
      price: '700',
      rating: 5,
      image:
        'https://img.freepik.com/free-psd/blue-stethoscope-medical-instrument-auscultation_191095-80856.jpg?ga=GA1.1.588198607.1743692197&semt=ais_hybrid&w=740',
    },
    {
      id: 9,
      name: 'Stethoscope',
      brand: 'Littmann Classic III Stethoscopes',
      description:
        'Short description of the product goes here. Highlight the key features.',
      price: '700',
      rating: 5,
      image:
        'https://img.freepik.com/free-psd/blue-stethoscope-medical-instrument-auscultation_191095-80856.jpg?ga=GA1.1.588198607.1743692197&semt=ais_hybrid&w=740',
    },
  ];
}

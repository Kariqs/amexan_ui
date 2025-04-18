import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  productName: string = 'Keychain Smart Watch';
  price: string = 'Ksh. 6,500';

  selectedColor: string = '';
  colors: string[] = ['Red', 'Blue', 'Green'];

  currentImageIndex: number = 0;
  images: string[] = [
    'https://images-cdn.ubuy.ae/64ef5249d19c45756b4308e9-ckfn-portable-wireless-charger-for-apple.jpg',
    'https://m.media-amazon.com/images/I/61md24jicRL.jpg',
    'https://m.media-amazon.com/images/I/715QZZ6nFUL.jpg',
    'https://m.media-amazon.com/images/I/610WtcLS9cL.jpg',
  ];

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }
}

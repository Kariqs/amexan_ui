import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NewProduct, ProductSpec } from '../../../../models/model';

@Component({
  selector: 'app-specifications',
  imports: [CommonModule],
  templateUrl: './specifications.component.html',
  styleUrl: './specifications.component.css',
})
export class SpecificationsComponent {
  @Input() productSpecs!: ProductSpec[];
  @Input() productImageUrl!: string;
}

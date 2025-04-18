import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-specifications',
  imports: [CommonModule],
  templateUrl: './specifications.component.html',
  styleUrl: './specifications.component.css',
})
export class SpecificationsComponent {
  productSpecs = [
    { label: 'Application', value: 'indoor/outdoor' },
    { label: 'IP Rating', value: 'IP20, Customizable (IP65, IP67, IP68)' },
    { label: 'Lamp Body Material', value: 'FPC' },
    { label: 'Warranty(Year)', value: '1-Year' },
    { label: 'Connectivity technology', value: 'Customizable' },
    { label: 'Brand Name', value: 'CHISHUO' },
    { label: 'Model Number', value: 'White Cob-DC12V/24V' },
    { label: 'Item Type', value: 'Light Strings' },
    { label: 'Input Voltage(V)', value: 'DC12V/24V' },
    { label: 'Lamp Luminous Efficiency(lm/w)', value: '120' },
  ];

  productImageUrl: string =
    'https://images-cdn.ubuy.ae/64ef5249d19c45756b4308e9-ckfn-portable-wireless-charger-for-apple.jpg';
}

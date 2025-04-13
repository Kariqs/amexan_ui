import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FaqItem } from '../../../models/model';

@Component({
  selector: 'app-faq-section',
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.css',
})
export class FaqSectionComponent {
  faqItems: FaqItem[] = [
    {
      question: 'What are the delivery options?',
      answer:
        'We offer standard delivery (3-5 business days), express delivery (1-2 business days), and same-day delivery for select areas. Shipping costs vary based on your location and chosen delivery method.',
      isOpen: false,
    },
    {
      question: 'How can I track my order?',
      answer:
        'You can track your order by logging into your account and visiting the "Order History" section. Alternatively, you can use the tracking number provided in your order confirmation email.',
      isOpen: false,
    },
    {
      question: 'What is the return policy?',
      answer:
        'We accept returns within 30 days of purchase. Products must be in their original packaging and unused condition. Please note that certain items like sterilized equipment cannot be returned for safety reasons.',
      isOpen: false,
    },
    {
      question: 'How can I contact customer service?',
      answer:
        'You can reach our customer service team via email at support@medcatalyst.com, by phone at (123) 456-7890, or through the contact form on our website. Our support hours are Monday-Friday, 9am-5pm EST.',
      isOpen: false,
    },
  ];

  toggleFaq(index: number): void {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}

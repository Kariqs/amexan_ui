import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from '../../../models/model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {
  contactSupport(arg0: number) {
    throw new Error('Method not implemented.');
  }
  printReceipt(arg0: number) {
    throw new Error('Method not implemented.');
  }
  generateInvoice(arg0: number) {
    throw new Error('Method not implemented.');
  }

  deleteOrder(arg0: number) {
    throw new Error('Method not implemented.');
  }

  refundOrder(arg0: number) {
    throw new Error('Method not implemented.');
  }
  onStatusChange(arg0: number, arg1: string | undefined) {
    throw new Error('Method not implemented.');
  }
  showItems = false;
  @Input() order!: Order;
  @Input() isAdmin!: boolean;

  toggleItemsVisibility(): void {
    this.showItems = !this.showItems;
  }
}

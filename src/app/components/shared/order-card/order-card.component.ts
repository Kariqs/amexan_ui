import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from '../../../models/model';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order/order.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {
  showItems = false;
  @Input() order!: Order;
  @Input() isAdmin!: boolean;

  constructor(
    private orderService: OrderService,
    private toaster: ToastrService
  ) {}

  toggleItemsVisibility(): void {
    this.showItems = !this.showItems;
  }

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
  onStatusChange(event: Event, orderId: number) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const patchData = { status: selectedValue };
    this.orderService.updateOrderStatus(orderId, patchData).subscribe({
      next: (response) => {
        this.toaster.info(response.message);
      },
      error: (error) => {
        this.toaster.error(error.message);
      },
    });
  }
}

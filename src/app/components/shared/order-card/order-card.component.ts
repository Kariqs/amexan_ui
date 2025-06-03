import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from '../../../models/model';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order/order.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-order-card',
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {
  showItems = false;
  @Input() order!: Order;
  @Input() isAdmin!: boolean;
  isUpdatingStatus: boolean = false;
  updatingMessage: string = 'Updating Order Status';

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
    this.isUpdatingStatus = true;
    const selectedValue = (event.target as HTMLSelectElement).value;
    const patchData = { status: selectedValue };
    this.orderService.updateOrderStatus(orderId, patchData).subscribe({
      next: (response) => {
        this.isUpdatingStatus = false;
        this.toaster.info(response.message);
      },
      error: (error) => {
        this.isUpdatingStatus = false;
        this.toaster.error(error.message);
      },
    });
  }
}

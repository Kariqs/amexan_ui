import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from '../../../models/model';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { PdfUtil } from '../../../utils/generateReceipt.util';
import { Router } from '@angular/router';
import { CheckoutService } from '../../../services/checkout/checkout.service';

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
  imageURL = 'https://www.amexan.store/images/logo.png';
  isGeneratingReceipt = false;
  isCompletingPayment = false;

  constructor(
    private orderService: OrderService,
    private toaster: ToastrService,
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  toggleItemsVisibility(): void {
    this.showItems = !this.showItems;
  }

  contactSupport(arg0: number) {
    throw new Error('Method not implemented.');
  }

  async printReceipt(order: Order, imageUrl: string) {
    try {
      this.isGeneratingReceipt = true;
      await PdfUtil.generateReceipt(order, imageUrl);
    } catch (error) {
      console.error(error);
    } finally {
      this.isGeneratingReceipt = false;
    }
  }

  deleteOrder(orderId: number) {
    this.orderService.deleteOrder(orderId).subscribe({
      next: (response) => {
        this.router.navigate(['admin', 'order-manager']).then(() => {
          this.toaster.info(response.message);
        });
      },
      error: (error) => {
        this.toaster.error(error.message);
      },
    });
  }

  refundOrder(arg0: number) {
    throw new Error('Method not implemented.');
  }

  completePayment(
    orderId: number,
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    deliveryLocation: string,
    total: number
  ) {
    const orderInfo = {
      ID: orderId,
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      deliveryLocation: deliveryLocation,
      total: total,
    };

    this.isCompletingPayment = true;
    this.checkoutService.createOrder(orderInfo).subscribe({
      next: (response) => {
        if (response) {
          this.isCompletingPayment = false;
          window.location.href = response.redirect_url;
        } else {
          this.isCompletingPayment = false;
          this.toaster.error('There was an error completing your payment.');
        }
      },
      error: (err) => {
        this.isCompletingPayment = false;
        this.toaster.error(err.message);
      },
    });
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

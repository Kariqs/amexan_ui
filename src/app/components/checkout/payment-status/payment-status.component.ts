import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../services/checkout/checkout.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-payment-status',
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.css',
})
export class PaymentStatusComponent implements OnInit {
  status: 'loading' | 'success' | 'failed' | 'error' = 'loading';
  message = '';
  trackingId = '';

  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.trackingId =
      this.route.snapshot.queryParamMap.get('OrderTrackingId') || '';
    if (this.trackingId) {
      this.checkStatus(this.trackingId);
    } else {
      this.status = 'error';
      this.message = 'No tracking ID provided.';
    }
  }

  checkStatus(orderTrackingId: string) {
    this.checkoutService.checkPaymentStatus(orderTrackingId).subscribe({
      next: (res) => {
        if (res.paymentStatus === 'Completed') {
          this.status = 'success';
          this.message = 'Payment completed successfully.';
          this.cartService.clearCart();
        } else if (res.paymentStatus === 'Failed') {
          this.status = 'failed';
          this.message = 'Payment failed. Please try again.';
        } else {
          this.status = 'error';
          this.message = 'Payment is still processing or unknown.';
        }
      },
      error: () => {
        this.status = 'error';
        this.message = 'Could not verify payment status.';
      },
    });
  }
}

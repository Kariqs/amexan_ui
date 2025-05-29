import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartItem, DecodedToken, Order } from '../../models/model';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth/auth.service';
import { CheckoutService } from '../../services/checkout/checkout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  submitted = false;
  shipping!: number;
  checkoutData!: Order;
  userId!: number;

  orderItems!: CartItem[];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private checkoutService: CheckoutService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      deliveryLocation: ['', Validators.required],
    });

    this.getOrderItems();
    this.setUserId();
    this.setShippingFee();
  }

  setUserId() {
    const token = this.authService.getToken();
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      this.userId = +decoded.user_id;
    }
  }

  get f() {
    return this.checkoutForm.controls;
  }

  setShippingFee() {
    const subTotal = this.getSubtotal();
    const shippingFee = subTotal * (10 / 100);
    this.shipping = shippingFee;
  }

  getOrderItems() {
    this.orderItems = this.cartService.getItems();
  }

  getSubtotal(): number {
    return this.orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getTotal(): number {
    return this.getSubtotal() + this.shipping;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.checkoutForm.invalid) {
      return;
    }

    this.checkoutData = {
      userId: this.userId,
      ...this.checkoutForm.value,
      orderItems: this.orderItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    this.checkoutService.createOrder(this.checkoutData).subscribe({
      next: (response: any) => {
        if (response) {
          this.toaster.info('Your order has been placed successfully.');
          this.checkoutForm.reset();
          this.cartService.clearCart()
        } else {
          this.toaster.error('There was an error placing your order.');
        }
      },
      error: (err) => {
        this.toaster.error(err.message);
      },
    });
  }
}

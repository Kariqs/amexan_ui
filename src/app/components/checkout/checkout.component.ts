import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartItem } from '../../models/model';
import { CommonModule } from '@angular/common';

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

  orderItems!: CartItem[];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });

    this.getOrderItems();
    this.setShippingFee();
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
  }
}

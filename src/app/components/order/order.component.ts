import { Component, Input } from '@angular/core';
import { DecodedToken, Order } from '../../models/model';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order/order.service';
import { AuthService } from '../../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { OrderCardComponent } from '../shared/order-card/order-card.component';
import { ModalComponent } from "../shared/modal/modal.component";

@Component({
  selector: 'app-order',
  imports: [CommonModule, OrderCardComponent, ModalComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  isAdmin: boolean = false;
  orders!: Order[];
  userId!: number;
  status: 'loading' | 'success' | 'error' = 'loading';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserId();
    this.getOrdersByUserId(this.userId);
  }

  getUserId() {
    const token = this.authService.getToken();
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      this.userId = +decoded.user_id;
      if (decoded.role === 'admin') {
        this.isAdmin = true;
      }
    }
  }

  getOrdersByUserId(userId: number) {
    this.status = 'loading';
    this.orderService.getOrdersByCustomerId(userId).subscribe({
      next: (fetchedOrders) => {
        this.status = 'success';
        this.orders = fetchedOrders.orders;
      },
      error: (err) => {
        this.status = 'error';
        this.toaster.error(err.message);
      },
    });
  }
}

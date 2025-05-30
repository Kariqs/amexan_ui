import { Component } from '@angular/core';
import { DecodedToken, Order } from '../../models/model';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order/order.service';
import { AuthService } from '../../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  showItems = false;
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

  toggleItemsVisibility(): void {
    this.showItems = !this.showItems;
  }

  getUserId() {
    const token = this.authService.getToken();
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      this.userId = +decoded.user_id;
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

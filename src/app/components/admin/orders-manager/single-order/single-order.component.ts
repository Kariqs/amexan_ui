import { Component, OnInit } from '@angular/core';
import { OrderCardComponent } from '../../../shared/order-card/order-card.component';
import { CommonModule } from '@angular/common';
import { DecodedToken, Order } from '../../../../models/model';
import { OrderService } from '../../../../services/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ModalComponent } from "../../../shared/modal/modal.component";

@Component({
  selector: 'app-single-order',
  imports: [CommonModule, OrderCardComponent, ModalComponent],
  templateUrl: './single-order.component.html',
  styleUrl: './single-order.component.css',
})
export class SingleOrderComponent implements OnInit {
  status: 'loading' | 'success' | 'error' = 'loading';
  isAdmin: boolean = false;
  order!: Order;
  orderId!: number;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setIsAdmin();
    this.route.params.subscribe((param) => {
      this.orderId = param['orderId'];
      this.fetchOrder(this.orderId);
    });
  }

  setIsAdmin() {
    const token = this.authService.getToken();
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.role === 'admin') {
        this.isAdmin = true;
      }
    }
  }

  fetchOrder(orderId: number) {
    this.status = 'loading';
    this.orderService.getOrdersById(orderId).subscribe({
      next: (fetchOrder) => {
        this.status = 'success';
        this.order = fetchOrder.order;
      },
      error: (error) => {
        this.status = 'error';
        this.toaster.error(error.message);
      },
    });
  }
}

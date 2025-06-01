import { Component } from '@angular/core';
import { Order, PageMetadata } from '../../../../models/model';
import { OrderService } from '../../../../services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent {
  limit: string = '';
  status: 'loading' | 'success' | 'error' = 'loading';
  orders!: Order[];
  numberOfRecords: number[] = [3, 5, 10, 15, 20, 25, 50, 100];
  pageMetadata!: PageMetadata;

  constructor(
    private orderService: OrderService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.status = 'loading';
    this.orderService.getOrders().subscribe({
      next: (fetchedOrders) => {
        this.status = 'success';
        this.pageMetadata = fetchedOrders.metadata;
        this.orders = fetchedOrders.orders;
      },
      error: (err) => {
        this.status = 'error';
        this.toaster.error(err.message);
      },
    });
  }

  onOrderClick(orderId: number) {
    this.router.navigate(['admin', 'order-manager', 'order', orderId]);
  }
}

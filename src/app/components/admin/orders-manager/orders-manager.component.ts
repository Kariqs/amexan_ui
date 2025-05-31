import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order, PageMetadata } from '../../../models/model';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-manager',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders-manager.component.html',
  styleUrl: './orders-manager.component.css',
})
export class OrdersManagerComponent implements OnInit {
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
}

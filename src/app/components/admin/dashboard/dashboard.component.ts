import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../models/model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  totalProducts!: number;
  recentOrders!: Order[];
  customers = 1245;
  undeliveredOrders!: number;
  totalOrders!: number;

  constructor(
    private productService: ProductsService,
    private orderService: OrderService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  fetchTotalProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.totalProducts = response.metadata.total;
      },
      error: (error) => {
        this.toaster.error(error);
      },
    });
  }

  fetchTotalOrders() {
    this.orderService.getOrders(1, 5).subscribe({
      next: (response) => {
        this.totalOrders = response.metadata.total;
        this.recentOrders = response.orders;
      },
      error: (error) => {
        this.toaster.error(error);
      },
    });
  }

  getUndeliveredOrdersCount() {
    this.orderService.getUndeliveredOrdersCount().subscribe({
      next: (response) => {
        this.undeliveredOrders = response.undeliveredOrderCount;
      },
      error: (error) => {
        this.toaster.error(error);
      },
    });
  }

  onAddProduct() {
    this.router.navigate(['admin', 'product-manager', 'create-product']);
  }

  onViewAllOrders() {
    this.router.navigate(['admin', 'order-manager']);
  }

  onRecentOrderClick(ordeId: number) {
    this.router.navigate(['admin', 'order-manager', 'order', ordeId]);
  }

  ngOnInit(): void {
    this.fetchTotalProducts();
    this.fetchTotalOrders();
    this.getUndeliveredOrdersCount();
  }
}

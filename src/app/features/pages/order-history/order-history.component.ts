import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../core/models/order.model';
import * as AuthSelectors from '../../auth/store/auth.selectors';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-history.component.html',
})
export class OrderHistoryComponent implements OnInit {
  private orderService = inject(OrderService);
  private store = inject(Store);

  orders$!: Observable<Order[]>;
  user$ = this.store.select(AuthSelectors.selectCurrentUser);

  ngOnInit() {
    this.orders$ = this.orderService.getOrders('current-user');
  }
}

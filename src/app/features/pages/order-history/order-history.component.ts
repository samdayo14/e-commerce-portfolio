import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../core/models/order.model';
import * as AuthSelectors from '../../auth/store/auth.selectors';
import {
  ProductQuickViewComponent,
  QuickViewData,
} from '../../../shared/components/modals/product-quick-view/product-quick-view.component';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductQuickViewComponent],
  templateUrl: './order-history.component.html',
})
export class OrderHistoryComponent implements OnInit {
  private orderService = inject(OrderService);
  private store = inject(Store);

  orders$!: Observable<Order[]>;
  user$ = this.store.select(AuthSelectors.selectCurrentUser);

  selectedProductForView: QuickViewData | null = null;

  ngOnInit() {
    this.orders$ = this.orderService.getOrders('current-user');
  }

  openQuickView(item: any) {
    this.selectedProductForView = {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.thumbnail || (item.images && item.images[0]) || '',
      description: item.description,
      category: item.category,
      rating: item.rating,
    };
  }

  closeQuickView() {
    this.selectedProductForView = null;
  }
}

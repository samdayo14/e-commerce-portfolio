import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';
import { Store } from '@ngrx/store';
import * as CartSelectors from '../../store/cart/cart.selectors';
import * as CartActions from '../../store/cart/cart.actions';

import {
  ProductQuickViewComponent,
  QuickViewData,
} from '../modals/product-quick-view/product-quick-view.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ProductQuickViewComponent],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss',
})
export class CartDrawerComponent {
  private store = inject(Store);
  private router = inject(Router);

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  selectedProductForView: QuickViewData | null = null;

  cartItems$ = this.store.select(CartSelectors.selectCartItems);
  subtotal$ = this.store.select(CartSelectors.selectCartTotal);

  openQuickView(item: any) {
    this.selectedProductForView = item;
  }

  closeQuickView() {
    this.selectedProductForView = null;
  }

  protected removeItem(id: number) {
    this.store.dispatch(CartActions.removeCart({ id }));
  }

  protected handleCheckout() {
    this.close.emit();
    this.router.navigate(['/checkout']);
  }
}

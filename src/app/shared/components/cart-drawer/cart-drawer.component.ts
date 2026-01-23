import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { ButtonComponent } from '../ui/button/button.component';
import * as CartSelectors from '../../store/cart/cart.selectors';
import * as CartActions from '../../store/cart/cart.actions';
import {
  ProductQuickViewComponent,
  QuickViewData,
} from '../modals/product-quick-view/product-quick-view.component';

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
  protected isCheckingOut = false;

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  selectedProductForView: QuickViewData | null = null;

  cartItems$ = this.store.select(CartSelectors.selectCartItems);
  subtotal$ = this.store.select(CartSelectors.selectCartTotal);
  isCartEmpty$ = this.cartItems$.pipe(map((items) => items.length === 0));

  openQuickView(item: any) {
    this.selectedProductForView = item;
  }

  closeQuickView() {
    this.selectedProductForView = null;
  }

  increment(id: number) {
    this.store.dispatch(CartActions.incrementItem({ id }));
  }

  decrement(id: number) {
    this.store.dispatch(CartActions.removeCart({ id }));
  }

  delete(id: number) {
    this.store.dispatch(CartActions.deleteItem({ id }));
  }

  protected handleCheckout() {
    this.isCheckingOut = true;

    setTimeout(() => {
      this.close.emit();
      this.router.navigate(['/checkout']);

      this.isCheckingOut = false;
    }, 7000);
  }
}

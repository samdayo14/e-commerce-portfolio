import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap, take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { InputComponent } from '../../shared/components/ui/input/input.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import * as CartSelectors from '../../shared/store/cart/cart.selectors';
import * as CartActions from '../../shared/store/cart/cart.actions';
import * as AuthSelectors from '../../features/auth/store/auth.selectors';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    RouterLink,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private store = inject(Store);
  private router = inject(Router);
  private orderService = inject(OrderService);

  cartItems$ = this.store.select(CartSelectors.selectCartItems);
  subtotal$ = this.store.select(CartSelectors.selectCartTotal);
  user$ = this.store.select(AuthSelectors.selectCurrentUser);

  tax$ = this.subtotal$.pipe(map((subtotal) => subtotal * 0.08));

  totalWithTax$ = combineLatest([this.subtotal$, this.tax$]).pipe(
    map(([subtotal, tax]) => subtotal + tax)
  );

  isProcessing = false;

  checkoutForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
    ]),
    expiry: new FormControl('', [Validators.required]),
    cvc: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get f() {
    return this.checkoutForm.controls;
  }

  onSubmit() {
    if (this.checkoutForm.invalid || this.isProcessing) return;

    this.isProcessing = true;

    combineLatest([this.cartItems$, this.totalWithTax$, this.user$])
      .pipe(
        take(1),
        switchMap(([items, total, user]) => {
          const orderData = {
            items: items,
            totalAmount: total,
            shippingDetails: {
              firstName: this.checkoutForm.value.firstName,
              lastName: this.checkoutForm.value.lastName,
              email: this.checkoutForm.value.email,
              address: this.checkoutForm.value.address,
              city: this.checkoutForm.value.city,
              state: this.checkoutForm.value.state,
              zip: this.checkoutForm.value.zip,
            },
            paymentMethod: 'Credit Card (Simulated)',
            date: new Date().toISOString(),
          };

          const userId = user ? (user as any).uid || user.id : 'guest_users';

          return this.orderService.createOrder(userId, orderData);
        })
      )
      .subscribe({
        next: (res: any) => {
          this.store.dispatch(CartActions.clearCart());

          this.router.navigate(['/order-success'], {
            state: {
              orderId: res.id,
              email: this.checkoutForm.value.email,
            },
          });
          this.isProcessing = false;
        },
        error: (err) => {
          this.isProcessing = false;
        },
      });
  }
}

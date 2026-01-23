import { Component, inject, OnInit } from '@angular/core';
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
export class CheckoutComponent implements OnInit {
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
      Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/),
    ]),
    expiry: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
    ]),
    cvc: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{3,4}$/),
    ]),
  });

  get f() {
    return this.checkoutForm.controls;
  }

  ngOnInit() {
    this.setupCardFormatting();
  }

  private setupCardFormatting() {
    this.f.cardNumber.valueChanges.subscribe((value) => {
      if (!value) return;

      let cleanVal = value.replace(/\D/g, '');

      if (cleanVal.length > 16) {
        cleanVal = cleanVal.substring(0, 16);
      }

      const formatted = cleanVal.match(/.{1,4}/g)?.join(' ') || cleanVal;

      if (value !== formatted) {
        this.f.cardNumber.setValue(formatted, { emitEvent: false });
      }
    });

    this.f.expiry.valueChanges.subscribe((value) => {
      if (!value) return;

      let cleanVal = value.replace(/\D/g, '');

      if (cleanVal.length > 4) {
        cleanVal = cleanVal.substring(0, 4);
      }

      let formatted = cleanVal;
      if (cleanVal.length >= 2) {
        formatted = cleanVal.substring(0, 2) + '/' + cleanVal.substring(2);
      }

      if (value !== formatted) {
        this.f.expiry.setValue(formatted, { emitEvent: false });
      }
    });

    this.f.cvc.valueChanges.subscribe((value) => {
      if (!value) return;

      let cleanVal = value.replace(/\D/g, '');
      if (cleanVal.length > 3) {
        cleanVal = cleanVal.substring(0, 3);
      }

      if (value !== cleanVal) {
        this.f.cvc.setValue(cleanVal, { emitEvent: false });
      }
    });
  }

  onSubmit() {
    if (this.checkoutForm.invalid || this.isProcessing) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

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

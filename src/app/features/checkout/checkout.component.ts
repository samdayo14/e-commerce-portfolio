import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/components/ui/input/input.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { RouterLink } from '@angular/router';

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
  cartItems = [
    {
      title: "Men's Trail Runners SWT",
      color: 'Deep Red',
      size: 10,
      price: 145,
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/448148/7e7f7d30-28e4-4d8e-9086-749712128912.png',
    },
    {
      title: "Women's Tree Breezers",
      color: 'Mist',
      size: 7,
      price: 100,
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/1M22823614073357591c261621213233/TD2M_Natural_Black_Black_Sole_0.png',
    },
  ];

  checkoutForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
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

  get subtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  get tax(): number {
    return this.subtotal * 0.08;
  }

  get total(): number {
    return this.subtotal + this.tax;
  }

  onSubmit() {
    if (this.checkoutForm.invalid) return;
    console.log('Processing Order:', this.checkoutForm.value);
  }
}

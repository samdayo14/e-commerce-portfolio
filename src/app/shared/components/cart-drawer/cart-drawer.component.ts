import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';

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
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  selectedProductForView: QuickViewData | null = null;

  cartItems = [
    {
      id: 1,
      title: "Men's Trail Runners SWT",
      color: 'Deep Red',
      size: 10,
      price: 145,
      quantity: 1,
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/448148/7e7f7d30-28e4-4d8e-9086-749712128912.png',
      description: "A durable runner that's ready for anything.", // Added description example
    },
    {
      id: 2,
      title: "Women's Tree Breezers",
      color: 'Mist',
      size: 7,
      price: 100,
      quantity: 2,
      image:
        'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_600/cms/1M22823614073357591c261621213233/TD2M_Natural_Black_Black_Sole_0.png',
      // Added for Quick View:
      category: "Women's Flats",
      rating: 4.8,
      description:
        'Light, breezy, and flexible. The perfect flat for everyday wear.',
    },
  ];

  get subtotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  openQuickView(item: any) {
    this.selectedProductForView = item;
  }

  closeQuickView() {
    this.selectedProductForView = null;
  }
}

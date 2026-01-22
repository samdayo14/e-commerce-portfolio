import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import * as ProductActions from '../../../shared/store/product/product.actions';
import * as ProductSelectors from '../../../shared/store/product/product.selectors';
import { Product } from '../../../core/models/product.model';
import * as CartActions from '../../../shared/store/cart/cart.actions';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  product$: Observable<Product | null> = this.store.select(
    ProductSelectors.selectSelectedProduct
  );
  isLoading$ = this.store.select(ProductSelectors.selectProductsLoading);

  activeImageIndex = 0;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(ProductActions.loadProduct({ id: +id }));
    }
  }

  setActiveImage(index: number) {
    this.activeImageIndex = index;
  }

  addToCart(product: Product) {
    this.store.dispatch(CartActions.addToCart({ product, quantity: 1 }));
  }

  getStars(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < Math.round(rating) ? 1 : 0));
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import * as ProductActions from '../../../shared/store/product/product.actions';
import * as ProductSelectors from '../../../shared/store/product/product.selectors';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private store = inject(Store);

  products$ = this.store.select(ProductSelectors.selectAllProducts);
  isLoading$ = this.store.select(ProductSelectors.selectProductsLoading);

  menFeature$ = this.products$.pipe(
    map((products) => products.find((p) => p.category.includes('mens')))
  );

  womenFeature$ = this.products$.pipe(
    map((products) => products.find((p) => p.category.includes('women')))
  );

  ngOnInit() {
    this.store.dispatch(ProductActions.loadProducts({}));
  }
}

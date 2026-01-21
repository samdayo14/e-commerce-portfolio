import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import * as ProductActions from '../../../shared/store/product.actions';
import * as ProductSelectors from '../../../shared/store/product.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ButtonComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private store = inject(Store);

  products$ = this.store.select(ProductSelectors.selectAllProducts);
  isLoading$ = this.store.select(ProductSelectors.selectProductsLoading);

  ngOnInit() {
    this.store.dispatch(ProductActions.loadProducts({}));
  }
}

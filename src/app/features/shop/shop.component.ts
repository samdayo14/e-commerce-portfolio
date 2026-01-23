import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import * as ProductActions from '../../shared/store/product/product.actions';
import * as ProductSelectors from '../../shared/store/product/product.selectors';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink, RouterLinkActive],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  allProducts$ = this.store.select(ProductSelectors.selectAllProducts);
  isLoading$ = this.store.select(ProductSelectors.selectProductsLoading);

  filteredProducts$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const category = params.get('category');

      return this.allProducts$.pipe(
        map((products) => {
          if (!category || category === 'all') {
            return products;
          }
          return products.filter((p) => p.category === category);
        })
      );
    })
  );

  pageTitle$ = this.route.paramMap.pipe(
    map((params) => {
      const cat = params.get('category');
      return cat && cat !== 'all'
        ? `${cat.replace('-', ' ')} Collection`
        : 'All Products';
    })
  );

  ProductCategories$ = this.allProducts$.pipe(
    map((products) => {
      const catName = products.map((p) => p.category);
      return [...new Set(catName)].sort();
    })
  );

  ngOnInit() {
    this.store.dispatch(ProductActions.loadProducts({}));
  }

  navigateToCategory(url: string) {
    this.router.navigateByUrl(url);
  }
}

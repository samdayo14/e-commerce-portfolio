import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs/operators';

import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import * as ProductActions from '../../shared/store/product/product.actions';
import * as ProductSelectors from '../../shared/store/product/product.selectors';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

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

          if (category === 'men') {
            return products.filter((p) => p.category.startsWith('mens'));
          }
          if (category === 'women') {
            return products.filter(
              (p) =>
                p.category.startsWith('womens') || p.category.includes('dress')
            );
          }

          return products.filter((p) => p.category === category);
        })
      );
    })
  );
  pageTitle$ = this.route.paramMap.pipe(
    map((params) => {
      const cat = params.get('category');
      if (cat === 'men') return "Men's Collection";
      if (cat === 'women') return "Women's Collection";
      return 'All Products';
    })
  );

  ProductCategories$ = this.allProducts$.pipe(
    map((categories) => {
      const catName = categories.map((c) => c.category);

      return [...new Set(catName)].sort();
    })
  );

  ngOnInit() {
    this.store.dispatch(ProductActions.loadProducts({}));
  }
}

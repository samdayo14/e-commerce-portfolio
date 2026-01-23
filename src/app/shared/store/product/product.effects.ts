import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductActions from './product.actions';
import { ProductService } from '../../services/products.service';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap((action) => {
        const fetch$ = action.category
          ? this.productService.getProductsByCategory(action.category)
          : this.productService.getProducts();

        return fetch$.pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(
              ProductActions.loadProductsFailure({
                error: error.message || error,
              })
            )
          )
        );
      })
    )
  );

  loadSingleProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      switchMap(({ id }) =>
        this.productService.getProduct(id).pipe(
          switchMap((product) => [
            ProductActions.loadProductSuccess({ product }),
            ProductActions.loadProducts({ category: product.category }),
          ]),
          catchError((error) =>
            of(
              ProductActions.loadProductFailure({
                error: error.message || error,
              })
            )
          )
        )
      )
    )
  );
}

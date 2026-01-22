import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CartActions from './cart.actions';
import { ProductService } from '../../services/products.service';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      exhaustMap(({ product, quantity }) => {
        const apiRequestBody = {
          userId: 1,
          products: [
            {
              id: product.id,
              quantity: quantity,
            },
          ],
        };
        return this.productService.addProductToCart(apiRequestBody).pipe(
          map((response) => CartActions.addToCartSuccess({ cart: response })),
          catchError((error) => of(CartActions.addToCartFailure({ error })))
        );
      })
    )
  );
}

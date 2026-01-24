import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';

import * as CartActions from './cart.actions';
import { selectCartState } from './cart.selectors';
import { ProductService } from '../../services/products.service';
import { ToastService } from '../../services/toast.service';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private productService = inject(ProductService);
  private toast = inject(ToastService);

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      exhaustMap(({ product, quantity }) => {
        const apiRequestBody = {
          userId: 1,
          products: [{ id: product.id, quantity: quantity }],
        };
        return this.productService.addProductToCart(apiRequestBody).pipe(
          map((response) => CartActions.addToCartSuccess({ cart: response })),
          catchError((error) => of(CartActions.addToCartFailure({ error })))
        );
      })
    )
  );

  addToCartSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.addToCartSuccess),
        tap(() =>
          this.toast.show('Product Added!', 'Check your cart.', 'success')
        )
      ),
    { dispatch: false }
  );

  saveCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CartActions.addToCart,
          CartActions.removeCart,
          CartActions.incrementItem,
          CartActions.deleteItem,
          CartActions.clearCart
        ),
        withLatestFrom(this.store.select(selectCartState)),
        tap(([action, state]) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('luxe_cart_state', JSON.stringify(state));
          }
        })
      ),
    { dispatch: false }
  );
}

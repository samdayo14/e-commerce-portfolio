import { createAction, props } from '@ngrx/store';
import { Product } from '../../../core/models/product.model';
import { CartItem } from '../../../core/models/cart.model';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product; quantity: number }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add To Cart Success',
  props<{ cart: any }>()
);

export const addToCartFailure = createAction(
  '[Cart] Add To Cart Failure',
  props<{ error: any }>()
);

export const removeCart = createAction(
  '[Cart] Decrement Item',
  props<{ id: number }>()
);

export const incrementItem = createAction(
  '[Cart Drawer] Increment Item',
  props<{ id: number }>()
);

export const deleteItem = createAction(
  '[Cart Drawer] Delete Item',
  props<{ id: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

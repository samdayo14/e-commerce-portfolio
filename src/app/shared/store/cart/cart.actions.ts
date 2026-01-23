import { createAction, props } from '@ngrx/store';
import { Product } from '../../../core/models/product.model';

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
  props<{ error: string }>()
);

export const removeCart = createAction(
  '[Cart] Remove Cart',
  props<{ id: number }>()
);

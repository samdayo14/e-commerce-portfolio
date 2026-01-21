import { createAction, props } from '@ngrx/store';
import { Product } from '../../core/models/product.model';

// --- LOAD LIST (PLURAL) ---
export const loadProducts = createAction(
  '[Shop] Load Products',
  props<{ category?: string }>()
);

export const loadProductsSuccess = createAction(
  '[Shop] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Shop] Load Products Failure',
  props<{ error: string }>()
);

// --- LOAD SINGLE (SINGULAR) ---
export const loadProduct = createAction(
  '[Shop] Load Single Product',
  props<{ id: number }>()
);

export const loadProductSuccess = createAction(
  '[Shop] Load Single Product Success',
  props<{ product: Product }>()
);

export const loadProductFailure = createAction(
  '[Shop] Load Single Product Failure',
  props<{ error: string }>()
);

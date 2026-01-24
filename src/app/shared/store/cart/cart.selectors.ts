import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../../../core/models/cart.model';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

export const selectCartTotal = createSelector(
  selectCartState,
  (state) => state.total
);

export const selectTotalQuantity = createSelector(
  selectCartState,
  (state) => state.totalQuantity
);

export const selectIsCartLoading = createSelector(
  selectCartState,
  (state) => state.loading
);

export const selectCartError = createSelector(
  selectCartState,
  (state) => state.error
);

export const selectIsCartEmpty = createSelector(
  selectCartItems,
  (items) => items.length === 0
);

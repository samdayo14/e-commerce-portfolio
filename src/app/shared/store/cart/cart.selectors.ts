import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../../../core/models/cart.model';

// 1. Get the feature state (must match the name in app.config.ts)
export const selectCartState = createFeatureSelector<CartState>('cart');

// 2. Select the List of Items (for Cart Drawer)
export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

// 3. Select the Total Price (for Subtotal)
export const selectCartTotal = createSelector(
  selectCartState,
  (state) => state.total
);

// 4. Select Total Quantity (for Navbar Badge count)
// This sums up all quantities (e.g., 2 shirts + 1 shoe = 3 items)
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

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('shop');

export const selectAllProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectSelectedProduct = createSelector(
  selectProductState,
  (state) => state.selectedProduct
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (state) => state.loading
);

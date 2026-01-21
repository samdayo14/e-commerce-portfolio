import { createReducer, on } from '@ngrx/store';
import { Product } from '../../core/models/product.model';
import * as ProductActions from './product.actions';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: products,
    loading: false,
  })),

  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  // --- SINGLE HANDLERS ---
  on(ProductActions.loadProduct, (state) => ({
    ...state,
    selectedProduct: null,
    loading: true,
    error: null,
  })),

  on(ProductActions.loadProductSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    loading: false,
  })),

  on(ProductActions.loadProductFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  }))
);

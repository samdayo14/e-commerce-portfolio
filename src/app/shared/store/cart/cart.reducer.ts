import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartState, CartItem } from '../../../core/models/cart.model';

export const initialCartState: CartState = {
  items: [],
  total: 0,
  discountedTotal: 0,
  totalProducts: 0,
  totalQuantity: 0,
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialCartState,

  on(CartActions.addToCart, (state, { product, quantity }) => {
    const existingItem = state.items.find((i) => i.id === product.id);
    let updatedItems: CartItem[];

    if (existingItem) {
      updatedItems = state.items.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
              total: item.price * (item.quantity + quantity),
            }
          : item
      );
    } else {
      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        total: product.price * quantity,
        discountPercentage: product.discountPercentage,
        discountedPrice:
          product.price - product.price * (product.discountPercentage / 100),
        thumbnail: product.thumbnail || product.images[0],
      };
      updatedItems = [...state.items, newItem];
    }

    const newTotal = updatedItems.reduce((acc, item) => acc + item.total, 0);
    const newTotalQuantity = updatedItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    return {
      ...state,
      items: updatedItems,
      total: newTotal,
      totalQuantity: newTotalQuantity,
      totalProducts: updatedItems.length,
      loading: true,
    };
  }),

  on(CartActions.addToCartSuccess, (state, { cart }) => ({
    ...state,
    loading: false,
  })),

  on(CartActions.addToCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(CartActions.removeCart, (state, { id }) => {
    const existingItem = state.items.find((i) => i.id === id);
    if (!existingItem) return state;

    let updatedItems: CartItem[];
    if (existingItem.quantity > 1) {
      updatedItems = state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              total: item.price * (item.quantity - 1),
            }
          : item
      );
    } else {
      updatedItems = state.items.filter((item) => item.id !== id);
    }
    const newTotal = updatedItems.reduce((acc, item) => acc + item.total, 0);
    const newTotalQuantity = updatedItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return {
      ...state,
      items: updatedItems,
      total: newTotal,
      totalQuantity: newTotalQuantity,
      totalProducts: updatedItems.length,
    };
  }),

  on(CartActions.clearCart, (state) => ({
    ...state,
    items: [],
    total: 0,
    discountedTotal: 0,
    totalProducts: 0,
    totalQuantity: 0,
  }))
);

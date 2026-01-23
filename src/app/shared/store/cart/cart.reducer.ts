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

function calculateTotals(
  state: CartState,
  updatedItems: CartItem[]
): CartState {
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
    loading: false,
  };
}

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

    return {
      ...calculateTotals(state, updatedItems),
      loading: true,
    };
  }),

  on(CartActions.addToCartSuccess, (state) => ({
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

    if (existingItem.quantity <= 1) return state;

    const updatedItems = state.items.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
            total: item.price * (item.quantity - 1),
          }
        : item
    );

    return calculateTotals(state, updatedItems);
  }),

  on(CartActions.incrementItem, (state, { id }) => {
    const updatedItems = state.items.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
            total: item.price * (item.quantity + 1),
          }
        : item
    );
    return calculateTotals(state, updatedItems);
  }),

  on(CartActions.deleteItem, (state, { id }) => {
    const updatedItems = state.items.filter((item) => item.id !== id);
    return calculateTotals(state, updatedItems);
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

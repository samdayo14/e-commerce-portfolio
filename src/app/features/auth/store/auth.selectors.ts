import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// 1. Get the entire "Auth" slice of the state
// 'auth' must match the key you use in app.config.ts later
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// 2. Select specific pieces of data

// Query: Is the spinner spinning?
export const selectIsLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

// Query: Who is the current user?
export const selectCurrentUser = createSelector(
  selectAuthState,
  (state) => state.user
);

// Query: Is there an error message?
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

// 3. Derived Selector (Calculated Logic)
// Query: Is the user logged in? (True if user exists, False if null)
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => !!state.user
);

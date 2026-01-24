import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AppUser } from '../../../core/models/app-user.model';

export interface AuthState {
  user: AppUser | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  authChecked: boolean;
}

export const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  message: null,
  authChecked: false,
};

export const authReducer = createReducer(
  initialState,

  // Login Trigger
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error: error.toString(),
    loading: false,
  })),

  on(AuthActions.signup, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.signupSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
  })),

  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    error: error.toString(),
    loading: false,
  })),

  on(AuthActions.resetPassword, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),

  on(AuthActions.resetPasswordSuccess, (state) => ({
    ...state,
    loading: false,
    message: 'Password reset email sent. Please check your inbox.',
    error: null,
  })),

  on(AuthActions.resetPasswordFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(AuthActions.restoreSession, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
    error: null,
    authChecked: true,
  })),

  on(AuthActions.authCheckComplete, (state) => ({
    ...state,
    authChecked: true,
    loading: false,
  }))
);

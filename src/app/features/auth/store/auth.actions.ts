import { createAction, props } from '@ngrx/store';
import { AppUser } from '../../../core/models/app-user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: AppUser }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: String }>()
);

export const signup = createAction(
  '[Auth] Signup',
  props<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{
    user: AppUser;
  }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{
    error: string;
  }>()
);

export const resetPassword = createAction(
  '[Auth] forgot Password',
  props<{ email: string }>()
);

export const resetPasswordSuccess = createAction(
  '[Auth] forgot Password success'
);

export const resetPasswordFailure = createAction(
  '[Auth] forgot Password failure',
  props<{ error: string }>()
);

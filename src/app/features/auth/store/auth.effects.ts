import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, exhaustMap, tap, take } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User as FirebaseUser } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';
@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) =>
        from(this.authService.signIn(email, password)).pipe(
          map((firebaseUser: FirebaseUser) => {
            const user = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              token: '',
              displayName: firebaseUser.displayName || '',
            };

            return AuthActions.loginSuccess({ user });
          }),

          catchError((error) => {
            this.toast.show('Login Failed', error.message, 'error');
            return of(AuthActions.loginFailure({ error: error.message }));
          })
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      exhaustMap(({ firstName, lastName, email, password }) =>
        from(
          this.authService.signUp({ firstName, lastName, email, password })
        ).pipe(
          map((firebaseUser: FirebaseUser) => {
            const user = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              token: '',
              displayName:
                firebaseUser.displayName || `${firstName} ${lastName}`,
            };
            return AuthActions.signupSuccess({ user });
          }),
          catchError((error) => {
            this.toast.show('Registration Failed', error.message, 'error');
            return of(AuthActions.signupFailure({ error: error.message }));
          })
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      exhaustMap(({ email }) =>
        from(this.authService.forgotPassword(email)).pipe(
          map(() => AuthActions.resetPasswordSuccess()),
          catchError((error) => {
            this.toast.show('Request Failed', error.message, 'error');
            return of(
              AuthActions.resetPasswordFailure({ error: error.message })
            );
          })
        )
      )
    )
  );

  loginSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          this.toast.show(
            'Welcome Back',
            `It's good to see you, ${user.displayName || 'Guest'}.`,
            'success'
          );
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  signupSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap(() => {
          this.toast.show(
            'Account Created',
            'Please sign in with your new credentials.',
            'success'
          );
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  resetPasswordSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.resetPasswordSuccess),
        tap(() => {
          this.toast.show(
            'Check your Inbox or Spam',
            'We have sent you a link to reset your password.',
            'info'
          );
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(() =>
        this.authService.authState$.pipe(
          take(1),
          map((firebaseUser) => {
            if (firebaseUser) {
              const user = {
                id: firebaseUser.uid,
                email: firebaseUser.email || '',
                token: '',
                displayName: firebaseUser.displayName || '',
              };
              return AuthActions.restoreSession({ user });
            }

            return { type: 'NO_ACTION' };
          })
        )
      )
    )
  );
}

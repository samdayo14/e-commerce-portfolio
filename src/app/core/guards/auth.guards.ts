import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, take } from 'rxjs/operators';
import * as AuthSelectors from '../../features/auth/store/auth.selectors';
import { ToastService } from '../../shared/services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const toast = inject(ToastService);

  return store.select(AuthSelectors.selectAuthChecked).pipe(
    filter((isChecked) => isChecked === true),
    take(1),

    switchMap(() =>
      store.select(AuthSelectors.selectIsLoggedIn).pipe(
        take(1),
        map((isLoggedIn) => {
          if (isLoggedIn) {
            return true;
          } else {
            toast.show('Access Denied', 'You must be logged in.', 'error');
            return router.createUrlTree(['/login']);
          }
        })
      )
    )
  );
};

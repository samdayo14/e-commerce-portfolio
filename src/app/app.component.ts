import { Component, inject, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  Router,
  NavigationEnd,
} from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { combineLatest, map, filter, delay } from 'rxjs';

import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { CartDrawerComponent } from './shared/components/cart-drawer/cart-drawer.component';
import { ToastComponent } from './shared/components/ui/toast/toast.component';
import { LoadingOverlayComponent } from './shared/components/ui/spinner/loading-overlay.component';

import { AuthService } from './features/auth/services/auth.service';
import * as AuthSelectors from './features/auth/store/auth.selectors';
import * as ProductSelectors from './shared/store/product.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    FooterComponent,
    CartDrawerComponent,
    ToastComponent,
    LoadingOverlayComponent,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showLayout = true;
  isCartOpen = false;
  private store = inject(Store);

  isLoading$ = combineLatest([
    this.store.select(AuthSelectors.selectIsLoading),
    this.store.select(ProductSelectors.selectProductsLoading),
  ]).pipe(
    map(([authLoading, productLoading]) => authLoading || productLoading),
    delay(0)
  );

  user$ = this.store.select(AuthSelectors.selectCurrentUser);
  isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const hiddenRoutes = [
          '/login',
          '/register',
          '/forgot-password',
          'checkout',
          '/order-success',
        ];

        const isAuthPage = hiddenRoutes.some((route) =>
          event.urlAfterRedirects.includes(route)
        );

        this.showLayout = !isAuthPage;
      });
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}

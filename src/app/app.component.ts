import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { combineLatest, map, filter, delay } from 'rxjs';

// Import your new Header Component
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { CartDrawerComponent } from './shared/components/cart-drawer/cart-drawer.component';
import { ToastComponent } from './shared/components/ui/toast/toast.component';
import { LoadingOverlayComponent } from './shared/components/ui/spinner/loading-overlay.component';

import * as AuthSelectors from './features/auth/store/auth.selectors';
import * as ProductSelectors from './shared/store/product/product.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
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
  private router = inject(Router);

  isLoading$ = combineLatest([
    this.store.select(AuthSelectors.selectIsLoading),
    this.store.select(ProductSelectors.selectProductsLoading),
  ]).pipe(
    map(([authLoading, productLoading]) => authLoading || productLoading),
    delay(0)
  );

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const hiddenRoutes = [
          '/login',
          '/register',
          '/forgot-password',
          '/checkout',
          '/order-success',
        ];
        this.showLayout = !hiddenRoutes.some((route) =>
          event.urlAfterRedirects.includes(route)
        );
      });
  }
}

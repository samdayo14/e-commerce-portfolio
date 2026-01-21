import { Component, inject, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  Router,
  NavigationEnd,
} from '@angular/router';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { filter } from 'rxjs/operators';
import * as AuthSelectors from './features/auth/store/auth.selectors';
import { CartDrawerComponent } from './shared/components/cart-drawer/cart-drawer.component';
import { ToastComponent } from './shared/components/ui/toast/toast.component';
import { Store } from '@ngrx/store';
import { LoadingOverlayComponent } from './shared/components/ui/spinner/loading-overlay.component';
import { AsyncPipe } from '@angular/common';

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

  isLoading$ = this.store.select(AuthSelectors.selectIsLoading);

  constructor(private router: Router) {}

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
}

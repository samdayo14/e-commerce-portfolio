import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../../../../features/auth/services/auth.service';
import * as AuthSelectors from '../../../../features/auth/store/auth.selectors';
import * as CartSelectors from '../../../../shared/store/cart/cart.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() toggleCart = new EventEmitter<void>();

  private store = inject(Store);
  private authService = inject(AuthService);
  private router = inject(Router);

  user$ = this.store.select(AuthSelectors.selectCurrentUser);
  isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
  cartCount$ = this.store.select(CartSelectors.selectTotalQuantity);

  logout() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}

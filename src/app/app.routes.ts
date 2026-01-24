import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { HomeComponent } from './features/pages/home/home.component';
import { ProductDetailComponent } from './features/pages/product-detail/product-detail.component';
import { ShopComponent } from './features/shop/shop.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrderSuccessComponent } from './features/checkout/order-success/order-success.component';
import { ForgotPasswordComponent } from './features/auth/pages/forgot-password/forgot-password.component';
import { authGuard } from './core/guards/auth.guards';
import { OrderHistoryComponent } from './features/pages/order-history/order-history.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Public Routes
  { path: 'home', component: HomeComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'shop/:category', component: ShopComponent },
  { path: 'orders', component: OrderHistoryComponent },

  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard],
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
    canActivate: [authGuard],
  },

  // Auth Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  { path: '**', redirectTo: 'home' },
];

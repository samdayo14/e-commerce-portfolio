import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';
import { environment } from '../environments/environments';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './features/auth/store/auth.reducer';
import { AuthEffects } from './features/auth/store/auth.effects';
import { productReducer } from './shared/store/product/product.reducer';
import { ProductEffects } from './shared/store/product/product.effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { cartReducer } from './shared/store/cart/cart.reducer';
import { CartEffects } from './shared/store/cart/cart.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideHttpClient(withFetch()),
    provideStore({
      auth: authReducer,
      shop: productReducer,
      cart: cartReducer,
    }),
    provideEffects([AuthEffects, ProductEffects, CartEffects]),
  ],
};

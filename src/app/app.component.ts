import { Component, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  Router,
  NavigationEnd,
} from '@angular/router';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { filter } from 'rxjs/operators';
import { CartDrawerComponent } from './shared/components/cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FooterComponent, CartDrawerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showLayout = true;
  isCartOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const hiddenRoutes = ['/login', '/register', '/forgot-password'];

        const isAuthPage = hiddenRoutes.some((route) =>
          event.urlAfterRedirects.includes(route)
        );

        this.showLayout = !isAuthPage;
      });
  }
}

import { Component, OnInit } from '@angular/core'; // Import OnInit
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.scss',
})
export class OrderSuccessComponent implements OnInit {
  orderId = '';
  email = '';

  ngOnInit() {
    const state = history.state as { orderId: string; email: string };
    if (state && state.orderId && state.email) {
      this.orderId = state.orderId;
      this.email = state.email;
    } else {
      this.orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
      this.email = 'guest@example.com';
    }
  }
}

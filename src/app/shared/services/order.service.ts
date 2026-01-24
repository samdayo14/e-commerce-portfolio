import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Order } from '../../core/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private STORAGE_KEY = 'luxe_order_history';

  /**
   * Create an order and save it to LocalStorage
   */
  createOrder(userId: string, orderData: any): Observable<Order> {
    // 1. Generate a random Order ID (e.g., ORD-7392)
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ORD-${randomId}`;

    // 2. Build the full Order object
    const newOrder: Order = {
      id: orderId,
      userId: userId,
      date: new Date().toISOString(),
      status: 'Processing',
      totalAmount: orderData.totalAmount,
      items: orderData.items,
      shippingDetails: orderData.shippingDetails,
    };

    // 3. Save to LocalStorage
    this.saveToHistory(newOrder);

    // 4. Return success (simulate API delay)
    return of(newOrder).pipe(delay(1000));
  }

  /**
   * Get all past orders for a user
   */
  getOrders(userId: string): Observable<Order[]> {
    const history = this.loadHistory();
    // In a real app, filtering by User ID happens on the server.
    // For now, we return all orders since we are mocking it.
    return of(history.reverse()).pipe(delay(500));
  }

  // --- Helpers ---

  private loadHistory(): Order[] {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  }

  private saveToHistory(order: Order) {
    if (typeof window !== 'undefined') {
      const currentHistory = this.loadHistory();
      const updatedHistory = [...currentHistory, order];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedHistory));
    }
  }
}

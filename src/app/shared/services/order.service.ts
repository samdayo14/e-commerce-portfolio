import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  createOrder(
    userId: string,
    orderData: any
  ): Observable<{ id: string; status: string; date: string }> {
    const randomNum = Math.floor(Math.random() * 100000);
    const year = new Date().getFullYear();
    const mockOrderId = `ORD-${year}-${randomNum}`;

    const mockResponse = {
      id: mockOrderId,
      status: 'success',
      date: new Date().toISOString(),
    };

    return of(mockResponse).pipe(delay(1500));
  }
}

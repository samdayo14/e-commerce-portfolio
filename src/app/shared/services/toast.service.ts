import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<Toast[]>([]);

  public show(
    title: string,
    message: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) {
    const id = Date.now().toString();
    const newToast: Toast = { id, type, title, message };

    this.toasts.update((current) => [...current, newToast]);

    setTimeout(() => {
      this.remove(id);
    }, 5000);
  }

  public remove(id: string) {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }
}

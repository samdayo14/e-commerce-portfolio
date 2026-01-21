import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed top-24 right-4 z-50 flex flex-col gap-4 w-full max-w-sm pointer-events-none"
    >
      @for (toast of toastService.toasts(); track toast.id) {
      <div
        class="pointer-events-auto w-full bg-white border-l-4 shadow-xl rounded-sm p-4 transform transition-all duration-300 ease-out animate-slide-in"
        [class.border-green-600]="toast.type === 'success'"
        [class.border-red-600]="toast.type === 'error'"
        [class.border-slate-900]="toast.type === 'info'"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            @if (toast.type === 'success') {
            <svg
              class="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            } @else if (toast.type === 'error') {
            <svg
              class="h-5 w-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            } @else {
            <svg
              class="h-5 w-5 text-slate-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            }
          </div>

          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-serif font-bold text-slate-900">
              {{ toast.title }}
            </p>
            <p class="mt-1 text-sm text-gray-500">{{ toast.message }}</p>
          </div>

          <div class="ml-4 flex flex-shrink-0">
            <button
              (click)="toastService.remove(toast.id)"
              class="inline-flex text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Close</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      }
    </div>
  `,
})
export class ToastComponent {
  toastService = inject(ToastService);
}

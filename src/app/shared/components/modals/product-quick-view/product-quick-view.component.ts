import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../ui/button/button.component';

export interface QuickViewData {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  rating?: number;
  stock?: number;
  brand?: string;
}

@Component({
  selector: 'app-product-quick-view',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink],
  template: `
    <div
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity z-[1000]"
      (click)="close.emit()"
    ></div>

    <div
      class="fixed inset-0 z-[1010] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
    >
      <div
        class="pointer-events-auto w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-slide-up"
      >
        <div
          class="relative w-full md:w-1/2 bg-[#f8f7f5] flex items-center justify-center p-8 md:p-12 min-h-[300px]"
        >
          <button
            (click)="close.emit()"
            class="absolute top-4 left-4 md:hidden p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-gray-900 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
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
          </button>

          @if (product?.image) {
          <img
            [src]="product?.image"
            [alt]="product?.title"
            class="w-full max-h-[300px] md:max-h-[400px] object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
            (error)="handleImageError($event)"
          />
          } @else {
          <div class="flex flex-col items-center justify-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-16 h-16 mb-2 opacity-50"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span class="text-sm font-medium">No Image Available</span>
          </div>
          }
        </div>

        <div class="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
          <div class="flex justify-between items-start mb-4">
            @if(product?.category) {
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-700 uppercase tracking-widest"
            >
              {{ product?.category }}
            </span>
            }
            <button
              (click)="close.emit()"
              class="hidden md:block p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
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
            </button>
          </div>

          <h2
            class="text-2xl md:text-3xl font-bold font-serif text-slate-900 mb-2 leading-tight"
          >
            {{ product?.title }}
          </h2>

          <div class="flex items-center mb-6">
            <div class="flex text-yellow-400">
              @for (star of getStars(product?.rating || 0); track $index) {
              <svg
                class="h-4 w-4"
                [class.text-gray-300]="star === 0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              }
            </div>
            <span class="ml-2 text-sm text-gray-500 font-medium">
              {{ product?.rating }} / 5
            </span>
          </div>

          <div class="mb-6">
            <p class="text-3xl font-bold text-slate-900 mb-4">
              {{ product?.price | currency }}
            </p>
            <p class="text-gray-600 text-sm leading-relaxed">
              {{
                product?.description ||
                  'Experience luxury with this premium item, designed for style and comfort.'
              }}
            </p>
          </div>

          <div class="mt-auto space-y-3">
            <a
              [routerLink]="['/products', product?.id]"
              (click)="close.emit()"
              class="block w-full"
            >
              <app-button [fullWidth]="true"> View Full Details </app-button>
            </a>

            <button
              (click)="close.emit()"
              class="w-full py-3 text-sm font-bold text-gray-500 hover:text-slate-900 transition-colors uppercase tracking-widest"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes slide-up {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-slide-up {
        animation: slide-up 0.3s ease-out;
      }
    `,
  ],
})
export class ProductQuickViewComponent {
  @Input() product: QuickViewData | null = null;
  @Output() close = new EventEmitter<void>();

  getStars(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < Math.round(rating) ? 1 : 0));
  }

  // Fallback if the URL exists but returns 404
  handleImageError(event: any) {
    event.target.style.display = 'none';
    // You could also set a default placeholder here:
    // event.target.src = 'assets/images/placeholder.png';
  }
}

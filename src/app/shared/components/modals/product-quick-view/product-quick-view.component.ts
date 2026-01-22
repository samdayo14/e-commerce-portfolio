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
}

@Component({
  selector: 'app-product-quick-view',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink],
  template: `
    <div
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity z-[110]"
      (click)="close.emit()"
    ></div>

    <div
      class="fixed inset-0 z-[120] flex min-h-full items-center justify-center p-4 text-center sm:p-0"
    >
      <div
        class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl border border-gray-100"
      >
        <div class="absolute right-4 top-4 z-10">
          <button
            (click)="close.emit()"
            class="rounded-full p-2 bg-white/80 hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <span class="sr-only">Close</span>
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2">
          <div
            class="relative h-64 md:h-auto bg-[#f8f7f5] flex items-center justify-center p-8 group"
          >
            <img
              [src]="product?.image"
              [alt]="product?.title"
              class="max-h-[80%] w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div class="p-8 md:p-10 flex flex-col justify-center">
            @if (product?.category) {
            <div class="mb-3">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 uppercase tracking-wide"
              >
                {{ product?.category }}
              </span>
            </div>
            }

            <h2
              class="text-3xl font-bold font-serif text-slate-900 leading-tight"
            >
              {{ product?.title }}
            </h2>

            <div class="mt-3 flex items-center">
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
              <span class="ml-2 text-xs text-gray-500 font-medium"
                >45 Reviews</span
              >
            </div>

            <div class="mt-4 flex items-baseline gap-3">
              <p class="text-2xl font-bold text-slate-900">
                {{ product?.price | currency }}
              </p>

              <span
                class="text-xs font-medium text-green-600 flex items-center gap-1"
              >
                <span class="block h-2 w-2 rounded-full bg-green-500"></span>
                In Stock
              </span>
            </div>

            <div class="mt-6">
              <p class="text-sm text-gray-600 leading-relaxed">
                {{
                  product?.description ||
                    'Engineered for comfort and built for performance.'
                }}
              </p>
            </div>

            <div class="mt-8 flex flex-col gap-3">
              <a
                [routerLink]="['/products', product?.id]"
                (click)="close.emit()"
                class="w-full"
              >
                <app-button [fullWidth]="true"> View Full Details </app-button>
              </a>

              <button
                (click)="close.emit()"
                class="text-sm text-gray-500 hover:text-slate-900 font-medium py-2 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductQuickViewComponent {
  @Input() product: QuickViewData | null = null;
  @Output() close = new EventEmitter<void>();

  getStars(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < Math.round(rating) ? 1 : 0));
  }
}

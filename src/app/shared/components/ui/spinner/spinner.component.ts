import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-center items-center gap-1.5 h-6">
      <div
        class="w-2 h-2 rounded-full bg-current animate-bounce"
        style="animation-delay: -0.3s"
      ></div>

      <div
        class="w-2 h-2 rounded-full bg-current animate-bounce"
        style="animation-delay: -0.15s"
      ></div>

      <div class="w-2 h-2 rounded-full bg-current animate-bounce"></div>
    </div>
  `,
  styles: [
    `
      .animate-bounce {
        animation: bounce 1s infinite;
      }
      @keyframes bounce {
        0%,
        100% {
          transform: translateY(0);
          opacity: 0.6;
        }
        50% {
          transform: translateY(-4px);
          opacity: 1;
        }
      }
    `,
  ],
})
export class SpinnerComponent {}

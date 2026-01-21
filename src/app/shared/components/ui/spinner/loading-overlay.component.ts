import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        class="bg-white py-6 px-12 rounded-lg shadow-2xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300"
      >
        <div class="scale-150">
          <app-spinner></app-spinner>
        </div>

        <p class="text-sm font-serif font-bold text-slate-900 tracking-wider">
          PROCESSING
        </p>
      </div>
    </div>
  `,
})
export class LoadingOverlayComponent {}

import { Component, Input } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() fullWidth = false;

  getClasses(): string {
    const base = this.fullWidth ? 'w-full' : '';
    const common =
      'flex justify-center items-center px-4 py-3 border text-sm font-bold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed';

    switch (this.variant) {
      case 'primary':
        return `${base} ${common} border-transparent bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900`;
      case 'secondary':
        return `${base} ${common} border-transparent bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500`;
      case 'outline':
        return `${base} ${common} border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-slate-500`;
      default:
        return `${base} ${common}`;
    }
  }
}

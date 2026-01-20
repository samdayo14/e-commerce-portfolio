import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() id = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input({ required: true }) control!: FormControl;

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get inputType(): string {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }

  hasError(): boolean {
    return !!(
      this.control.invalid &&
      (this.control.dirty || this.control.touched)
    );
  }

  getErrorMessage(): string {
    if (this.control.hasError('required')) return `${this.label} is required`;
    if (this.control.hasError('email'))
      return 'Please enter a valid email address';
    if (this.control.hasError('minlength')) return 'Password is too short';
    return 'Invalid value';
  }
}

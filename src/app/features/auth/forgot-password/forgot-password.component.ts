import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { InputComponent } from '../../../shared/components/ui/input/input.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  isEmailSent = false;

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get f() {
    return this.forgotForm.controls;
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;

    console.log('Reset Email Sent to:', this.forgotForm.value.email);
    this.isEmailSent = true;
  }
}

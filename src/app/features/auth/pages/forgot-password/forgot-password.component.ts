import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/ui/input/input.component';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../../store/auth.selectors';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private store = inject(Store);

  isLoading$ = this.store.select(AuthSelectors.selectIsLoading);
  error$ = this.store.select(AuthSelectors.selectAuthError);
  isEmailSent = false;

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get f() {
    return this.forgotForm.controls;
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;

    const email = this.forgotForm.value.email ?? '';

    this.store.dispatch(AuthActions.resetPassword({ email }));
  }
}

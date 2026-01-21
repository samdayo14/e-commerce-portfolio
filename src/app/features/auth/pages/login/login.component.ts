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
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private store = inject(Store);

  isLoading$ = this.store.select(AuthSelectors.selectIsLoading);
  error$ = this.store.select(AuthSelectors.selectAuthError);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';

    this.store.dispatch(AuthActions.login({ email, password }));
  }
}

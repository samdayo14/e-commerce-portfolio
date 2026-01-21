import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../../store/auth.selectors';
import * as AuthActions from '../../store/auth.actions';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/ui/input/input.component';

@Component({
  selector: 'app-register',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private store = inject(Store);

  isLoading$ = this.store.select(AuthSelectors.selectIsLoading);
  error$ = this.store.select(AuthSelectors.selectAuthError);

  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { firstName, lastName, email, password } = this.registerForm.value;

    this.store.dispatch(
      AuthActions.signup({
        firstName: firstName!,
        lastName: lastName!,
        email: email!,
        password: password!,
      })
    );
  }
}

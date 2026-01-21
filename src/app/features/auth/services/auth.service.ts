import { Injectable, Signal, inject } from '@angular/core';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  user,
  updateProfile,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { FirebaseError } from 'firebase/app';
import { UserCredential } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth$ = inject(Auth);
  private _userSignal: Signal<User | null | undefined> = toSignal(
    user(this.auth$)
  );

  public get user(): User | undefined {
    return this._userSignal() ?? undefined;
  }

  public async getToken(): Promise<string> {
    return (await this.user?.getIdToken()) ?? '';
  }

  public get loggedIn(): boolean {
    return !!this.user;
  }

  public async signOut(): Promise<void> {
    await this.auth$.signOut();
  }

  public async signUp({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<User> {
    try {
      const credential = await createUserWithEmailAndPassword(
        this.auth$,
        email,
        password
      );

      if (credential.user) {
        await updateProfile(credential.user, {
          displayName: `${firstName} ${lastName}`,
        });

        await credential.user.reload();
      }

      return credential.user;
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async signIn(email: string, password: string): Promise<User> {
    try {
      const result: UserCredential = await signInWithEmailAndPassword(
        this.auth$,
        email,
        password
      );

      return result.user;
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async updateDisplayName(displayName: string): Promise<void> {
    try {
      const currentUser = this.auth$.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, { displayName });
      }
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async updateEmailAddress(email: string): Promise<void> {
    if (!this.user) throw new Error('User not authenticated.');
    try {
      await updateEmail(this.user, email);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async updatePassword(newPassword: string): Promise<void> {
    if (!this.user) throw new Error('User not authenticated.');
    try {
      await updatePassword(this.user, newPassword);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth$, email);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async confirmPasswordReset(
    code: string,
    password: string
  ): Promise<void> {
    try {
      await confirmPasswordReset(this.auth$, code, password);
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  private handleError(error: any): string {
    let message = '';

    if (!(error instanceof FirebaseError)) return error['message'];

    switch (error.code) {
      case 'auth/invalid-email':
        message = 'Invalid email';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        message = 'Incorrect Email and password combination.';
        break;

      case 'auth/network-request-failed':
        message =
          'Error connecting to server. Kindly check your internet connection.';
        break;

      case 'auth/weak-password':
        message = 'The password is too weak.';
        break;

      case 'auth/email-already-in-use':
        message = 'This email address is already in use by another account.';
        break;

      case 'auth/operation-not-allowed':
        message = 'Email/password accounts are not enabled.';
        break;
      default:
        message = error.message || 'An error occurred.';
    }

    return message;
  }

  public get name(): string {
    return this.user?.displayName ?? '';
  }

  public get email(): string {
    return this.user?.email ?? '';
  }
}

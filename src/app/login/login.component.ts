import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
    standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  usePhone: boolean = false;
  message: string = '';
  passwordStrengthMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+968[0-9]{8}$/)]]
    });
  }

    // Custom validator for password strength
    passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
      const value = control.value || '';
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasNumber = /[0-9]/.test(value);
  
      const isValid = hasUpperCase && hasLowerCase && hasSpecialChar && hasNumber;
      return !isValid ? { weakPassword: true } : null;
    }

      // Check password strength when user types
  onPasswordInput() {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('weakPassword')) {
      this.passwordStrengthMessage = 'Password is weak. Include uppercase, lowercase, number, and special character.';
    } else {
      this.passwordStrengthMessage = '';
    }
  }

  // Toggle login method
  toggleLoginMethod() {
    this.usePhone = !this.usePhone;
    this.message = '';
    // this.loginForm.reset(); // Clear the form when switching login methods
  }


    // Login method
    async login() {
      const { email, password, phoneNumber } = this.loginForm.value;
  
      try {
        if (this.usePhone) {
          if (this.loginForm.get('phoneNumber')?.invalid) {
            this.message = 'Invalid phone number format. Please use +968XXXXXXXX.';
            return;
          }
          const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
          const confirmationResult = await this.afAuth.signInWithPhoneNumber(phoneNumber, appVerifier);
          const verificationCode = window.prompt('Enter verification code');
          await confirmationResult.confirm(verificationCode!);
        } else {
          if (this.loginForm.get('email')?.invalid || this.loginForm.get('password')?.invalid) {
            this.message = 'Please provide valid email and password.';
            return;
          }
          await this.afAuth.signInWithEmailAndPassword(email, password);
        }
        this.message = 'Login successful!';
        this.router.navigate(['/parents-dashboard']);
      } catch (error: any) {
        this.message = error.message;
      }
    }

  // Forgot password handler
  forgotPassword() {
    if (!this.loginForm.get('email')?.value) {
      this.router.navigate(['/forget-password']);
      return;
    }
    this.router.navigate(['/forget-password']);
  }
}

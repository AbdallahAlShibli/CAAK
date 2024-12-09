import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    // Initialize the reactive form with validation rules
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+968[0-9]{8}$/)]]
    });
  }

  // Toggle login method
  toggleLoginMethod() {
    this.usePhone = !this.usePhone;
    this.message = '';
    // this.loginForm.reset(); // Clear the form when switching login methods
  }

  // Login method
  async login() {
    console.log("login0");
    const { email, password, phoneNumber } = this.loginForm.value;

    try {
      console.log("login");
      if (this.usePhone) {
        console.log("phone");
        if (this.loginForm.get('phoneNumber')?.invalid) {
          this.message = 'Invalid phone number format. Please use +968XXXXXXXX.';
          return;
        }
        const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        const confirmationResult = await this.afAuth.signInWithPhoneNumber(phoneNumber, appVerifier);
        const verificationCode = window.prompt('Enter verification code');
        await confirmationResult.confirm(verificationCode!);
      } else {
        console.log("email");
        if (this.loginForm.get('email')?.invalid || this.loginForm.get('password')?.invalid) {
          this.message = 'Please provide valid email and password.';
          return;
        }
        await this.afAuth.signInWithEmailAndPassword(email, password);
      }
      this.message = 'Login successful!';
      this.router.navigate(['/add-new-child']);
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

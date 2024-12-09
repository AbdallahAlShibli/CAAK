import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {
  registerForm: FormGroup;
  usePhone: boolean = false;
  phoneNumber: string = '';
  verificationCode: string = '';
  verificationStep: boolean = false;
  confirmationResult: firebase.auth.ConfirmationResult | null = null;
  message: string = '';

  constructor(private fb: FormBuilder, private router: Router, private afAuth: AngularFireAuth) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\w+([-+.'']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) // Valid email pattern
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8), // Minimum length 8
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/) // At least one uppercase letter, one number
      ]],
    });
  }

  ngAfterViewInit(): void {
    try {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'normal',
        callback: (response: any) => {
          console.log('reCAPTCHA resolved:', response);
        },
        'expired-callback': () => {
          console.warn('reCAPTCHA expired. Please refresh and try again.');
        }
      });
    } catch (error) {
      console.error('Error initializing reCAPTCHA:', error);
    }
  }

  // Register with email and password
  async onRegisterWithEmail() {
    const { email, password } = this.registerForm.value;
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.message = 'Registration successful!';
      this.router.navigate(['/add-new-child']);
      console.log('User registered:', userCredential);
    } catch (error: any) {
      this.message = error.message;
    }
  }

  // Send verification code for phone number registration
  async onRegisterWithPhone() {
    try {
      // Ensure recaptcha-container is properly initialized
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          console.log('Recaptcha resolved', response);
        },
        'expired-callback': () => {
          console.warn('Recaptcha expired. Please try again.');
        }
      });

      // Verify if phone number is valid
      if (!this.phoneNumber || !this.phoneNumber.match(/^\+968[0-9]{8}$/)) {
        this.message = 'Please enter a valid Oman phone number (e.g., +96812345678)';
        return;
      }

      this.confirmationResult = await this.afAuth.signInWithPhoneNumber(this.phoneNumber, appVerifier);
      this.verificationStep = true;
      this.message = 'Verification code sent!';
    } catch (error: any) {
      console.error('Error during phone registration:', error);
      this.message = error.message || 'An error occurred. Please try again.';
    }
  }

  // Verify the code and complete phone registration
  async verifyCode() {
    if (!this.confirmationResult) return;
    try {
      const result = await this.confirmationResult.confirm(this.verificationCode);
      this.message = 'Phone number verified and registered successfully!';
      console.log('User registered with phone:', result);
    } catch (error: any) {
      this.message = error.message;
    }
  }
}
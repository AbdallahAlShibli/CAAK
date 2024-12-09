import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

declare global {
  interface Window {
    recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  }
}

@Component({
  selector: 'app-phone-register',
  standalone: false,
  templateUrl: './phone-register.component.html',
  styleUrls: ['./phone-register.component.css']
})
export class PhoneRegisterComponent implements AfterViewInit {
  phoneRegisterForm: FormGroup;
  verificationCode: string = '';
  verificationStep: boolean = false;
  confirmationResult: firebase.auth.ConfirmationResult | null = null;
  message: string = '';

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {
    this.phoneRegisterForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+968[0-9]{8}$/)]]
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

  async sendVerificationCode() {
    if (this.phoneRegisterForm.invalid) {
      this.message = 'Please enter a valid Oman phone number (+968XXXXXXXX).';
      return;
    }

    const phoneNumber = this.phoneRegisterForm.get('phoneNumber')?.value;

    try {
      const appVerifier = window.recaptchaVerifier;
      this.confirmationResult = await this.afAuth.signInWithPhoneNumber(phoneNumber, appVerifier);
      this.verificationStep = true;
      this.message = 'Verification code sent!';
    } catch (error: any) {
      console.error('Error during phone registration:', error);
      this.message = error.message || 'An error occurred. Please try again.';
    }
  }

  async verifyCode() {
    if (!this.confirmationResult) {
      this.message = 'No confirmation result found. Please resend the code.';
      return;
    }

    try {
      const result = await this.confirmationResult.confirm(this.verificationCode);
      this.message = 'Phone number verified and registered successfully!';
      console.log('User registered with phone:', result.user);
    } catch (error: any) {
      console.error('Error verifying code:', error);
      this.message = error.message || 'Invalid verification code. Please try again.';
    }
  }
}

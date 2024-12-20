import { Component, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  passwordStrengthMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private afAuth: AngularFireAuth) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email,
        this.gmailDomainValidator, // Gmail domain validator added here
        Validators.pattern(/^\w+([-+.'']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]]
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

    // Custom validator for Gmail domain
    gmailDomainValidator(control: AbstractControl): ValidationErrors | null {
      const email = control.value || '';
      const domain = email.split('@')[1];
      if (email && domain !== 'gmail.com') {
        return { invalidDomain: true };
      }
      return null;
    }

  // Custom validator for strong password
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    return !isValid ? { weakPassword: true } : null;
  }

    // Password input event to check for strength
    onPasswordInput() {
      const passwordControl = this.registerForm.get('password');
      if (passwordControl?.hasError('weakPassword')) {
        this.passwordStrengthMessage = 'Password is weak. Include uppercase, lowercase, number, and special character.';
      } else {
        this.passwordStrengthMessage = '';
      }
    }

  // Register with email and password
  async onRegisterWithEmail() {
    const { email, password } = this.registerForm.value;
    if (this.registerForm.get('password')?.hasError('weakPassword')) {
      this.message = 'Please enter a strong password before submitting.';
      return;
    }
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.message = 'Registration successful!';
      this.router.navigate(['/login']);
      console.log('User registered:', userCredential);
    } catch (error: any) {
      this.message = error.message;
    }
  }

  // Send verification code for phone number registration
  async onRegisterWithPhone() {
    try {
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          console.log('Recaptcha resolved', response);
        },
        'expired-callback': () => {
          console.warn('Recaptcha expired. Please try again.');
        }
      });

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
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: false,
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  resetForm: FormGroup;
  message: string | null = null;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {
    this.resetForm = this.fb.group({
      resetOption: ['email', Validators.required],
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]]
    });
  }

  async onSubmit() {
    const { resetOption, email, phone } = this.resetForm.value;

    try {
      if (resetOption === 'email' && email) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.message = `Password reset link sent to ${email}`;
      } else if (resetOption === 'phone' && phone) {
        // Simulate phone number reset. Firebase Auth doesn't directly support phone-based password reset.
        // You'll need to implement phone verification and custom password reset logic if required.
        this.message = `Password reset instructions sent to ${phone}`;
      } else {
        this.message = 'Invalid option or input.';
      }
    } catch (error) {
      console.error(error);
      this.message = 'Error occurred. Please try again.';
    }
  }
}
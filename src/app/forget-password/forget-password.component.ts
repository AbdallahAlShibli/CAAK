import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
      phone: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.matchPasswords });
  }

  // Custom validator to check password strength
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    return !isValid ? { weakPassword: true } : null;
  }

  // Custom validator to check if newPassword matches confirmPassword
  matchPasswords(group: FormGroup): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return newPassword && confirmPassword && newPassword !== confirmPassword
      ? { passwordsMismatch: true }
      : null;
  }

  // Submit logic
  async onSubmit() {
    const { resetOption, email, phone, newPassword } = this.resetForm.value;

    try {
      if (resetOption === 'email' && email) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.message = `Password reset link sent to ${email}`;
        this.router.navigate(['/login']);
      } else if (resetOption === 'phone' && phone) {
        this.message = `Password reset instructions sent to ${phone}`;
        this.router.navigate(['/login']);

      } else {
        this.message = 'Invalid option or input.';
      }
    } catch (error) {
      console.error(error);
      this.message = 'Error occurred. Please try again.';
    }
  }
}
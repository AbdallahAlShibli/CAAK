import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authservice';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  email: string = '';
  password: string = '';
  otp: string = '';
  otpSent: boolean = false;
  message: string = '';


  constructor(private router: Router, private authService: AuthService) { }
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }


  async onRegister() {
    try {
      const user = await this.authService.registerWithEmail(this.email, this.password);
      if (user) {
        this.otpSent = true;
        this.message = 'OTP sent to your email. Please verify.';
      }
    } catch (error) {
      if (error instanceof Error)
        this.message = `Error: ${error.message}`;
    }
  }

  async verifyOtp() {
    try {
      const verified = await this.authService.verifyEmail(this.otp, this.email, this.password);
      if (verified) {
        this.message = 'Verification successful! You are registered.';
        console.log('User ID:', this.authService.userId); // The user ID is now stored
      } else {
        this.message = 'OTP verification failed.';
      }
    } catch (error) {
      if (error instanceof Error)
        this.message = `Error: ${error.message}`;
    }
  }

}

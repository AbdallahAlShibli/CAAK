import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'; // Import Firebase compatibility layer for older methods

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  [x: string]: any;
  userId: string | null = null;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Login with email and password
  async loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

 
  // Register user with email and send verification email
  async registerWithEmail(email: string, password: string) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.userId = userCredential.user?.uid || null;
    await userCredential.user?.sendEmailVerification();
    return true; // Return a boolean indicating success
  }

  // Register user with phone number
  async registerWithPhone(phone: string) {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });

    const confirmationResult = await this.afAuth.signInWithPhoneNumber(phone, recaptchaVerifier);
    return confirmationResult; // Return the confirmationResult for OTP verification
  }

  // Verify email OTP (using email/password login as a verification mechanism)
  async verifyEmailOtp(email: string, password: string) {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
    return userCredential.user?.emailVerified || false; // Return a boolean
  }

  // Verify phone OTP
  async verifyPhoneOtp(confirmationResult: firebase.auth.ConfirmationResult, otp: string) {
    const userCredential = await confirmationResult.confirm(otp);
    this.userId = userCredential.user?.uid || null;
    return !!userCredential.user; // Return a boolean indicating success
  }

  // Save user data to Firestore
  async saveUserData(userId: string, username: string, contact: string) {
    return this.firestore.collection('users').doc(userId).set({
      username,
      contact,
    });
  }
}

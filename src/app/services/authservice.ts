import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userId: string | null = null;

  constructor(private afAuth: AngularFireAuth) {}

  // Register with Email
  async registerWithEmail(email: string, password: string) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.userId = userCredential.user?.uid || null;

    // Send verification email (OTP)
    await userCredential.user?.sendEmailVerification();
    return userCredential.user;
  }

  // Verify the OTP by re-authenticating
  async verifyEmail(otp: string, email: string, password: string) {
    const user = await this.afAuth.signInWithEmailAndPassword(email, password);
    if (user.user?.emailVerified) {
      this.userId = user.user.uid; // Save user ID once verified
      return true;
    }
    return false;
  }

  // Check if user is authenticated and email is verified
  async isAuthenticated() {
    const currentUser = await this.afAuth.currentUser;
    return currentUser?.emailVerified || false;
  }
}

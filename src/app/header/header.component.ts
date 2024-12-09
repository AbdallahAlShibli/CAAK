import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    // Check authentication state
    this.afAuth.authState.subscribe(user => {
      this.isLoggedIn = !!user; // If user exists, set isLoggedIn to true
    });
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.isLoggedIn = false; // Reset login state
      this.router.navigate(['/login']); // Navigate to home page or login page
    });
  }
}

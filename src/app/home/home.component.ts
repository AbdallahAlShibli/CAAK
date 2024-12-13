import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private afAuth: AngularFireAuth, private router: Router) { };
  ngOnInit() {
    // Check authentication state
    this.afAuth.authState.subscribe(user => {
      this.isLoggedIn = !!user; // If user exists, set isLoggedIn to true
    });
  }

  getStarted() {
    // Navigate to another page, e.g., "/signup"
    if (this.isLoggedIn) {
      this.router.navigate(['/game']);

    }
  }

}

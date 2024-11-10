import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) { }
  onLogin() {
    // Add login logic here
    console.log('Login button clicked');
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}

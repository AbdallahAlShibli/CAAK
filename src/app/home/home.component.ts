import { Component } from '@angular/core';
import { AuthService } from '../services/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
constructor(private authService: AuthService, private router: Router){};

getUserId() {
  console.log(this.authService.userId);
}

getStarted() {
  // Navigate to another page, e.g., "/signup"
  this.router.navigate(['/game']);
}

}

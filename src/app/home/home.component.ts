import { Component } from '@angular/core';
import { AuthService } from '../services/authservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
constructor(private authService: AuthService){};

getUserId() {
  console.log(this.authService.userId);
}

}

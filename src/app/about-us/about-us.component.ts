import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  constructor(private router: Router) { }
  teamMembers = [
    {
      name: 'Alice Johnson',
      position: 'CEO',
      photo: 'assets/team/alice.jpg',
      bio: 'Alice has over 10 years of experience in the industry and is passionate about leading our company towards success.'
    },
    {
      name: 'Bob Smith',
      position: 'CTO',
      photo: 'assets/team/bob.jpg',
      bio: 'Bob is a tech enthusiast with a deep understanding of technology and innovation.'
    },
    {
      name: 'Carol White',
      position: 'Marketing Head',
      photo: 'assets/team/carol.jpg',
      bio: 'Carol is an expert in marketing with a proven track record in strategic planning and brand building.'
    }
  ];

}

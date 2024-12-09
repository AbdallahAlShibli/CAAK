import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: false,
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  slides = [
    {
      image: 'assets/rev_slider1_3.png', // Path to foreground image 1
      text: 'Welcome to SafeNet Kids: Cybersecurity Awareness for Children!'
    },
    {
      image: 'assets/rev_slider1_3.png', // Path to foreground image 2
      text: 'Description for the second slide.'
    },
    {
      image: 'assets/rev_slider1_3.png', // Path to foreground image 2
      text: 'Description gtergtefor the second slide.'
    },
    {
      image: 'assets/rev_slider1_3.png', // Path to foreground image 2
      text: 'y54y5y5y for the second slide.'
    },
    {
      image: 'assets/rev_slider1_3.png', // Path to foreground image 2
      text: 'Descriptiony4t43t for the second slide.'
    }
  ];

  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}

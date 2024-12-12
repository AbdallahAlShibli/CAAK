import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {


  constructor(private router: Router) {}


  cardItems = [
    {
      title: 'Card 1',
      description: 'This is a description for Card 1',
      tips: ['Tip 1', 'Tip 2', 'Tip 3']
    },
    {
      title: 'Card 2',
      description: 'This is a description for Card 2',
      tips: ['Tip A', 'Tip B', 'Tip C']
    }
  ];
}
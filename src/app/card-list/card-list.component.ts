import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  @Input() items: { title: string; description: string; tips: string[] }[] = [];
  flipped: boolean[] = [];

  toggleFlip(index: number): void {
    this.flipped[index] = !this.flipped[index];
  }
}
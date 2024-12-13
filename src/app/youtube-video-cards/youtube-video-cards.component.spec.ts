import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeVideoCardsComponent } from './youtube-video-cards.component';

describe('YoutubeVideoCardsComponent', () => {
  let component: YoutubeVideoCardsComponent;
  let fixture: ComponentFixture<YoutubeVideoCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YoutubeVideoCardsComponent]
    });
    fixture = TestBed.createComponent(YoutubeVideoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

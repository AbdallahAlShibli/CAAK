import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface VideoItem {
  type: 'video';
  content: string; // Video URL
}

interface FlipCardItem {
  type: 'flipCard';
  content: {
    title: string;
    description: string;
    tips: string[];
  };
}

interface FlashCardItem {
  type: 'flashCard';
  content: {
    title: string;
    description: string;
    tips?: string[]; // Optional tips
    questions: { question: string; options: string[]; correctAnswer: string }[];
  };
}

type LevelItem = VideoItem | FlipCardItem | FlashCardItem;

interface Level {
  title: string;
  items: LevelItem[];
}

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
})
export class LevelComponent implements OnInit {
  levels: Level[] = [
    {
      title: 'Level 1: Protecting Your Personal Information',
      items: [
        {
          type: 'video',
          content: 'https://www.youtube.com/embed/89eCHtFs0XM',
        },
        {
          type: 'flipCard',
          content: {
            title: 'Protecting Your Personal Information',
            description: 'Learn how to keep your personal information safe when you’re online.',
            tips: [
              'Keep Personal Details Private – Never share your full name, address, or phone number with strangers online.',
              'Be Careful with Social Media – Don’t post photos or information that could tell people where you are or what you’re doing.',
              'Use Strong Passwords – Create unique passwords for different accounts, and don’t share them with anyone.',
              'Ask Before Sharing – Always ask an adult if it’s safe to share something online.',
            ],
          },
        },
        {
          type: 'flashCard',
          content: {
            title: 'Flash Card: Password Strength',
            description:
              'Strong passwords should be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.',
            questions: [
              {
                question: "Is '12345' a strong password?",
                options: ['Yes', 'No'],
                correctAnswer: 'No',
              },
              {
                question: 'Which of the following is a strong password?',
                options: ['password123', 'P@ssw0rd!'],
                correctAnswer: 'P@ssw0rd!',
              },
            ],
          },
        },
      ],
    },
  ];

  currentLevelIndex = 0;
  currentItemIndex = 0;
  isFlipped = false;
  selectedAnswers: { [key: number]: string } = {};
  children: any[] = [];
  selectedChildName: string | null = null;
  selectedChildId: string | null = null;
  userId: string | null = null;
  message: string = ''; // Message to show to the user

  constructor(
    private sanitizer: DomSanitizer,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.loadChildren();
      }
    });

  }

  loadChildren(): void {
    if (this.userId) {
      this.firestore
        .collection('users')
        .doc(this.userId)
        .collection('children')
        .valueChanges({ idField: 'id' })
        .subscribe((children) => {
          this.children = children;
        });
    }
  }

  onChildSelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedChildId = target.value;

    const selectedChild = this.children.find((child) => child.id === selectedChildId);
    if (selectedChild) {
      this.selectedChildName = selectedChild.name;
      this.selectedChildId = selectedChildId; // Update the selected child ID
      this.message = ''; // Clear any previous messages
    }
  }

  saveProgress(): void {
    if (!this.selectedChildId) {
      this.message = '*Please select a child to save progress.';
      return;
    }

    if (this.userId) {
      this.firestore
        .collection('users')
        .doc(this.userId)
        .collection('children')
        .doc(this.selectedChildId)
        .update({
          progress: this.currentLevelIndex + 1, // Save the current level as progress
        })
        .catch((error) => {
          console.error('Error saving progress:', error);
        });
    }
  }

  get currentItem(): LevelItem {
    return this.levels[this.currentLevelIndex].items[this.currentItemIndex];
  }

  get isLastItem(): boolean {
    return this.currentItemIndex === this.levels[this.currentLevelIndex].items.length - 1;
  }

  get isLastLevel(): boolean {
    return this.currentLevelIndex === this.levels.length - 1;
  }

  nextItem(): void {
    if (!this.selectedChildId) {
      this.message = '*Please select a child to proceed.';
      return;
    }

    if (this.currentItemIndex < this.levels[this.currentLevelIndex].items.length - 1) {
      this.currentItemIndex++;
      this.isFlipped = false;
    } else if (this.isLastItem) {
      this.saveProgress();
    }
  }

  nextLevel(): void {
    if (!this.selectedChildId) {
      this.message = '*Please select a child to proceed.';
      return;
    }

    if (this.currentLevelIndex < this.levels.length - 1) {
      this.currentLevelIndex++;
      this.currentItemIndex = 0;
      this.isFlipped = false;
      this.saveProgress();
    }
  }

  toggleFlip(): void {
    this.isFlipped = !this.isFlipped;
  }

  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  submitFlashCardAnswers(): void {
    if (this.currentItem.type === 'flashCard') {
      const questions = this.currentItem.content.questions;
      const allCorrect = questions.every(
        (q, index) => this.selectedAnswers[index] === q.correctAnswer
      );

      if (allCorrect) {
        alert('Great job! All answers are correct.');
        this.nextItem();
      } else {
        alert('Some answers are incorrect. Please review and try again.');
      }
    }
  }
}
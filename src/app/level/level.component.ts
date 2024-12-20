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

    {
      title: 'Level 2: Understanding Cyberbullying',
      items: [
        {
          type: 'video',
          content: 'https://www.youtube.com/embed/dMdKmHjpgFk',
        },
        {
          type: 'flipCard',
          content: {
            title: 'FlipCard: Understanding Cyberbullying',
            description: 'Tips:',
            tips: [
              '1.⁠ ⁠Don’t Engage in Bullying\n◦ If you see someone being mean online, don’t join in or share it. Just ignore it.',
              '2.⁠ ⁠Talk to an Adult\n◦ If someone is being mean to you or someone else, tell a trusted adult. They can help!',
              '3.⁠ ⁠Report Harmful Behavior\n◦ If you see bad behavior online, tell the website or app by using the "report" button. It helps stop bullying!',
              '4.⁠ ⁠Be Kind Online\n◦ Be nice to others online, just like you are in real life. Treat everyone with respect!',
            ],
          },
        },
        {
          type: 'flashCard',
          content: {
            title: 'Flash Card: Treat everyone with respect!',
            description: 'Understanding Cyberbullying',
            questions: [
              {
                question: 'What should you do if you see someone being mean to others online?',
                options: [
                  'a) Join in and be mean too',
                  'b) Tell a trusted adult',
                  'c) Ignore it and do nothing',
                ],
                correctAnswer: 'b) Tell a trusted adult',
              },
              {
                question: 'What should you do if someone is being rude to you online?',
                options: [
                  'a) Be rude back',
                  'b) Report them to an adult or the app',
                ],
                correctAnswer: 'b) Report them to an adult or the app',
              },
              {
                question: 'How can you be kind online?',
                options: [
                  'a) Say nice things and be respectful',
                  'b) Ignore people',
                  'c) Don’t talk to anyone at all',
                ],
                correctAnswer: 'a) Say nice things and be respectful',
              },
            ],
          },
        },
      ],
    },

    {
      title: 'Level 3: Stay Safe While Gaming',
      items: [
        {
          type: 'video',
          content: 'https://www.youtube.com/embed/yrln8nyVBLU',
        },
        {
          type: 'flipCard',
          content: {
            title: 'FlipCard: Stay Safe While Gaming',
            description: 'Tips to help you stay safe while playing games online.',
            tips: [
              '1.⁠ ⁠Use a Nickname\n◦ Don’t use your real name in games. Pick a fun nickname!',
              '2.⁠ ⁠Keep Communication Safe\n◦ Be careful when talking to people you don’t know. Don’t share personal details like where you live or your phone number.',
              '3.⁠ ⁠Play Safe Games\n◦ Only play games that your parents say are good for you.',
              '4.⁠ ⁠Tell Someone if Something Feels Wrong\n◦ If someone is being mean or makes you feel uncomfortable, tell an adult or report them right away.',
            ],
          },
        },
        {
          type: 'flashCard',
          content: {
            title: 'Flash Card: Kids Gaming Safety',
            description: 'Learn how to stay safe while gaming online.',
            questions: [
              {
                question: "What should you do if someone you don’t know asks for your phone number while playing a game?",
                options: [
                  'A) Share it with them',
                  'B) Tell a trusted adult or report them',
                  'C) Ignore them',
                ],
                correctAnswer: 'B) Tell a trusted adult or report them',
              },
              {
                question: 'What kind of name should you use in online games?',
                options: [
                  'A) Your real name',
                  'B) A nickname',
                  'C) Your parents\' name',
                ],
                correctAnswer: 'B) A nickname',
              },
              {
                question: 'If you feel uncomfortable or someone is being mean to you in a game, what should you do?',
                options: [
                  'A) Keep playing and ignore it',
                  'B) Tell an adult or report the problem',
                  'C) Respond with a mean message',
                ],
                correctAnswer: 'B) Tell an adult or report the problem',
              },
            ],
          },
        },
      ],
    },

    {
      title: 'Level 4: Recognizing Phishing Scams',
      items: [
        {
          type: 'video',
          content: 'https://www.youtube.com/embed/qRWpvcjpQNw',
        },
        {
          type: 'flipCard',
          content: {
            title: 'FlipCard: Recognizing Phishing Scams',
            description: 'Learn how to identify and avoid phishing scams.',
            tips: [
              '1.⁠ ⁠Don’t Click on Unknown Links\n◦ If you get a message or email from someone you don’t know, don’t click on any links or open any files.',
              '2.⁠ ⁠Look for Fake Emails\n◦ Fake emails might look funny or have spelling mistakes. Always check carefully!',
              '3.⁠ ⁠Never Share Personal Info\n◦ Real messages will never ask for your name, address, or phone number.',
              '4.⁠ ⁠Ask Before Responding\n◦ If you’re not sure about an email, ask a parent or trusted adult before you reply.',
            ],
          },
        },
        {
          type: 'flashCard',
          content: {
            title: 'Flash Card: Watch Out for Phishing',
            description: 'Learn how to stay safe from phishing scams.',
            questions: [
              {
                question: "Someone says you’ve won a prize. What should you do?",
                options: [
                  'Click the link',
                  'Tell an adult',
                ],
                correctAnswer: 'Tell an adult',
              },
              {
                question: 'Should you share your password if someone asks?',
                options: [
                  'No, passwords are secret',
                  'Yes, if they ask nicely',
                ],
                correctAnswer: 'No, passwords are secret',
              },
            ],
          },
        },
      ],
    },


    {
      title: 'Level 5: Setting Up Privacy on Apps',
      items: [
        {
          type: 'video',
          content: 'https://www.youtube.com/embed/d5kW4pI_VQw',
        },
        {
          type: 'flipCard',
          content: {
            title: 'Flipcard: Setting Up Privacy on Apps',
            description: 'Learn how to protect your privacy when using apps.',
            tips: [
              '1. Check Who Can See Your Info\n◦ Look at the settings on your apps to see who can see your pictures or messages. Keep it private!',
              '2. Share Only What You Need\n◦ Don’t share too much about yourself. Only share what’s important or needed.',
              '3. Turn Off Location\n◦ Some apps may ask to know where you are. Turn it off unless you really need it.',
              '4. Ask an Adult for Help\n◦ If you’re not sure what to do, ask a parent or trusted adult to help you.',
            ],
          },
        },
        {
          type: 'flashCard',
          content: {
            title: 'The Dangers of Downloads and Apps',
            description: 'Learn how to stay safe while downloading games and apps.',
            questions: [
              {
                question: 'Should you download a game from a random website?',
                options: ['Yes', 'No'],
                correctAnswer: 'No',
              },
              {
                question: 'A coloring app asks for your location. What should you do?',
                options: ['Allow it', 'Ask an adult first'],
                correctAnswer: 'Ask an adult first',
              },
            ],
          },
        },
      ],
    },


    {
      title: 'Level 6: How to Make a Strong Password',
      items: [
        {
          type: 'video',
          content: 'https://www.youtube.com/embed/YitHISP0Isk',
        },
        {
          type: 'flipCard',
          content: {
            title: 'Flipcard: How to Make a Strong Password',
            description: 'Tips for creating a strong password that keeps your accounts safe.',
            tips: [
              '1.⁠ ⁠Use Letters and Numbers\n◦ Make your password a mix of letters (big and small) and numbers to make it harder to guess.',
              '2.⁠ ⁠Add Special Symbols\n◦ Use symbols like !, ?, or # to make your password even stronger.',
              '3.⁠ ⁠Make It Long\n◦ The longer your password, the better. Try to make it at least 8 characters long.',
              '4.⁠ ⁠Don’t Use Easy Info\n◦ Don’t use your name, birthday, or simple words. Make it unique!',
              '5.⁠ ⁠Ask an Adult for Help\n◦ If you’re unsure how to make a strong password, ask a parent or trusted adult to help you.',
            ],
          },
        },
        {
          type: 'flashCard',
          content: {
            title: 'How to Make a Strong Password',
            description: 'Learn the basics of creating strong passwords to protect your online accounts.',
            questions: [
              {
                question: "Is '12345' a good password?",
                options: ['Yes', 'No'],
                correctAnswer: 'No',
              },
              {
                question: 'How many characters should your password have?',
                options: ['At least 8', '3'],
                correctAnswer: 'At least 8',
              },
              {
                question: 'Who is it okay to share your password with?',
                options: ['Your friends', 'Your parents'],
                correctAnswer: 'Your parents',
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
  showNextLevelButton = false;
  showCongratulatoryMessage = false;

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
        .subscribe(
          (children) => {
            this.children = children;
          },
          (error) => {
            console.error('Error loading children:', error);
          }
        );
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

    if (!this.userId) {
      console.error('User ID is null. Cannot load children.');
      return;
    }
    console.log('test save');
    this.firestore
      .collection('users')
      .doc(this.userId)
      .collection('children')
      .doc(this.selectedChildId)
      .set(
        { progress: this.currentLevelIndex + 1 }, // Save the current level as progress
        { merge: true } // Merge with existing data
      )
      .then(() => {
        this.message = 'Progress saved successfully!';
      })
      .catch((error) => {
        console.error('Error saving progress:', error);
        this.message = 'Error saving progress. Please try again.';
      });
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
    }

    // else if (this.isLastItem) {
    //   this.saveProgress();
    // }
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
      this.message = '';
      this.showNextLevelButton = false;
      this.showCongratulatoryMessage = false; // Reset for next level
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
        this.showCongratulatoryMessage = true;
        this.message = 'Great job! All answers are correct.';
        this.showNextLevelButton = true; // Show "Next Level" button after congratulatory message
      } else {
        this.message = 'Some answers are incorrect. Please review and try again.';
      }
    }
  }
}
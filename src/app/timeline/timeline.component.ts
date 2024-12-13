import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  isLoggedIn: boolean = false; // Tracks if the user is logged in
  currentLevel = 0; // Tracks the current active level
  dialogOpen = false; // Controls the dialog visibility
  currentDialogLevel = 0; // Tracks which level's dialog is open
  selectedAnswers: string[] = []; // Stores user's selected answers for both questions

  timeline = [
    {
      title: "How to Make a Strong Password!",
      description: "Your password is like a secret key to your online stuff. Here’s how to make it super strong:",
      tips: [
        "Go Long – Use at least 8 characters. Example: 'FunGame2024!'",
        "Mix It Up – Use big and small letters, numbers, and symbols. Example: 'CoolCat#12'.",
        "Keep It Secret – Only share with your parents!"
      ],
      questions: [
        {
          question: "Is '12345' a good password?",
          options: ["Yes", "No"],
          correctAnswer: "No"
        },
        {
          question: "How many characters should your password have?",
          options: ["At least 8", "3"],
          correctAnswer: "At least 8"
        },
        {
          question: "Who is it okay to share your password with?",
          options: ["Your friends", "Your parents"],
          correctAnswer: "Your parents"
        }
      ]
    },
    {
      title: "Watch Out for Phishing!",
      description: "Phishing is when someone tricks you into sharing secrets like passwords. Stay safe by following these tips:",
      tips: [
        "Check Who Sent It – If it looks strange, don’t trust it!",
        "Watch for Tricks – Messages that ask for info or say, 'Click now to win!' are usually fake.",
        "Ask an Adult – If you’re unsure, don’t click."
      ],
      questions: [
        {
          question: "Someone says you’ve won a prize. What should you do?",
          options: ["Click the link", "Tell an adult"],
          correctAnswer: "Tell an adult"
        },
        {
          question: "Should you share your password if someone asks?",
          options: ["No, passwords are secret", "Yes, if they ask nicely"],
          correctAnswer: "No, passwords are secret"
        }
      ]
    },
    {
      title: "Keep Your Info Private!",
      description: "Your personal info is valuable. Here’s how to keep it safe:",
      tips: [
        "What’s Personal Info? – Your name, address, school, or photos.",
        "Don’t Share It – Only share with people you trust, like your parents.",
        "Think Before You Post – Once it’s online, it’s hard to take back!",
        "Ask an Adult – Before signing up for apps or games."
      ],
      questions: [
        {
          question: "Should you tell someone your address online?",
          options: ["No", "Yes"],
          correctAnswer: "No"
        },
        {
          question: "Can you post a photo without asking a parent?",
          options: ["No", "Yes"],
          correctAnswer: "No"
        }
      ]
    },
    {
      title: "The Dangers of Downloads and Apps",
      description: "Here’s how to stay safe when downloading apps and games:",
      tips: [
        "Use Trusted Stores – Only download from places like Google Play or the Apple App Store.",
        "Watch Out for Free Stuff – Be careful with free games or cheats; they could be unsafe.",
        "Check Permissions – Only let apps access things like your camera if you really need it.",
        "Ask an Adult – Always check with a parent before downloading anything."
      ],
      questions: [
        {
          question: "Should you download a game from a random website?",
          options: ["Yes", "No"],
          correctAnswer: "No"
        },
        {
          question: "A coloring app asks for your location. What should you do?",
          options: ["Allow it", "Ask an adult first"],
          correctAnswer: "Ask an adult first"
        }
      ]
    }
  ];

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    // Check authentication state
    this.afAuth.authState.subscribe(user => {
      this.isLoggedIn = !!user; // If user exists, set isLoggedIn to true
    });
  }

  openDialog(level: number): void {
    if (level <= this.currentLevel) {
      this.currentDialogLevel = level;
      this.dialogOpen = true;
      this.selectedAnswers = Array(this.timeline[level].questions.length).fill(''); // Reset selected answers
    }
  }

  closeDialog(): void {
    this.dialogOpen = false;
  }

  submitAnswer(): void {
    const currentQuestions = this.timeline[this.currentDialogLevel].questions;
    const allCorrect = currentQuestions.every((q, index) => this.selectedAnswers[index] === q.correctAnswer);

    if (allCorrect) {
      if (this.currentDialogLevel === this.currentLevel) {
        this.currentLevel++; // Progress to the next level
      }
      this.closeDialog();
    } else {
      alert('Some answers are incorrect. Please try again.');
    }
  }
}
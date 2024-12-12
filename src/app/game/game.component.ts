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
      title: 'Protecting Your Personal Information',
      description: 'Learn how to keep your personal information safe when you’re online.',
      tips: [
        'Keep Personal Details Private – Never share your full name, address, or phone number with strangers online.',
        'Be Careful with Social Media – Don’t post photos or information that could tell people where you are or what you’re doing.',
        'Use Strong Passwords – Create unique passwords for different accounts, and don’t share them with anyone.',
        'Ask Before Sharing – Always ask an adult if it’s safe to share something online.'
      ]
    },
    {
      title: 'Understanding Cyberbullying',
      description: 'Learn how to recognize and stop cyberbullying.',
      tips: [
        'Don’t Engage in Bullying – If you see bullying online, don’t respond or share it with others.',
        'Talk to an Adult – If you’re being bullied or see someone else being bullied, talk to a trusted adult.',
        'Report Harmful Behavior – Use the report features on websites and apps to alert someone about cyberbullying.',
        'Be Kind Online – Treat others with respect, just like you would in person.'
      ]
    },
    {
      title: 'Stay Safe While Gaming',
      description: 'Learn how to stay safe while playing games online with friends and strangers.',
      tips: [
        'Use a Nickname – Don’t use your real name in online games. Choose a fun nickname instead.',
        'Keep Communication Safe – Be cautious when chatting with strangers. Never share personal details.',
        'Play Only Approved Games – Only play games that your parents approve of and that are age-appropriate.',
        'Report Suspicious Behavior – If someone is being rude or making you uncomfortable, report them immediately.'
      ]
    },
    {
      title: 'Recognizing Phishing Scams',
      description: 'Learn how to spot phishing emails and messages that try to steal your information.',
      tips: [
        'Don’t Click on Unknown Links – If you get an email or message from someone you don’t know, don’t click on links or download files.',
        'Look for Fake Emails – Phishing emails may have strange addresses or misspelled words. Always double-check.',
        'Never Share Personal Info – Legitimate companies will never ask for personal information through email or messages.',
        'Ask Before Responding – If you’re unsure about an email, ask a parent or teacher before opening it.'
      ]
    },
    {
      title: 'Setting Up Privacy on Apps',
      description: 'Learn how to protect your privacy by adjusting app settings.',
      tips: [
        'Review Privacy Settings – Always check the privacy settings on any app or game to control who can see your information.',
        'Limit What You Share – Only share what is necessary on apps and social media. The less, the better!',
        'Turn Off Location Services – Some apps may ask to track your location. Turn this off unless it’s necessary.',
        'Ask an Adult for Help – If you’re unsure about what to share or how to adjust settings, ask a trusted adult.'
      ]
    }
  ];
}
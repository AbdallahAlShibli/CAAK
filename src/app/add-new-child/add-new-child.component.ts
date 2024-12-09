import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-add-new-child',
  standalone: false,
  templateUrl: './add-new-child.component.html',
  styleUrls: ['./add-new-child.component.css']
})
export class AddNewChildComponent {
  childForm: FormGroup;
  childIcon: string | ArrayBuffer | null = null;
  userId: string | null = null;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.childForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(18)]],
      gender: ['', Validators.required],
      icon: [''] // For storing the icon URL
    });

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  // Handle file selection for child icon
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.childIcon = e.target.result; // Assign only if result is valid
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Add a new child to Firestore
  async addChild(): Promise<void> {
    if (this.childForm.invalid) {
      this.message = 'Please fill in all fields correctly.';
      return;
    }

    const childData = {
      ...this.childForm.value,
      icon: this.childIcon // Add the uploaded icon to the data
    };

    try {
      if (this.userId) {
        await this.firestore
          .collection('users')
          .doc(this.userId)
          .collection('children')
          .add(childData);
        this.message = 'Child added successfully!';
        this.childForm.reset();
        this.childIcon = null; // Reset the icon
      } else {
        this.message = 'User not authenticated. Please log in again.';
      }
    } catch (error) {
      console.error('Error adding child:', error);
      this.message = 'An error occurred. Please try again.';
    }
  }
}
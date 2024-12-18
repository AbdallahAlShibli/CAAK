import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-add-new-child',
  templateUrl: './add-new-child.component.html',
  styleUrls: ['./add-new-child.component.css']
})
export class AddNewChildComponent {
  childForm: FormGroup;
  childIcon: string | null = null;
  userId: string | null = null;
  message: string = '';
  showImagePicker: boolean = false;
  availableImages: string[] = ['/assets/p1.jpeg', '/assets/p2.jpeg', '/assets/p3.jpeg', '/assets/p4.jpeg', '/assets/p5.jpeg', '/assets/p6.jpeg'];

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.childForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(18)]],
      gender: ['', Validators.required],
      icon: ['']
    });

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  // Show image picker
  openImagePicker(): void {
    this.showImagePicker = true;
  }

  // Handle image selection
  selectImage(image: string): void {
    this.childIcon = image; // Set the selected image as the childIcon
    this.showImagePicker = false; // Close the popup
  }

  // Add a new child to Firestore
  async addChild(): Promise<void> {
    if (this.childForm.invalid) {
      this.message = 'Please fill in all fields correctly.';
      return;
    }

    const childData = {
      ...this.childForm.value,
      icon: this.childIcon || null
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
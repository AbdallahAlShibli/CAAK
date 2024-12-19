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

  async addChild(): Promise<void> {
    if (this.childForm.invalid) {
      this.message = 'Please fill in all fields correctly.';
      return;
    }
  
    const newChildName = this.childForm.value.name.trim().toLowerCase();
  
    try {
      if (this.userId) {
        // Perform query to check if a child with the same name exists
        const querySnapshot = await this.firestore
          .collection('users')
          .doc(this.userId)
          .collection('children', ref => ref.where('name', '==', newChildName))
          .get()
          .toPromise();
  
        // Check if querySnapshot is not undefined and contains documents
        if (querySnapshot && !querySnapshot.empty) {
          this.message = `A child with the name "${this.childForm.value.name}" already exists.`;
          return;
        }
  
        const childData = {
          ...this.childForm.value,
          name: newChildName,
          icon: this.childIcon || null
        };
  
        // Add the child data to Firestore
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
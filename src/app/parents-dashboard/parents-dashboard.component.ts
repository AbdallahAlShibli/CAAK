import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parents-dashboard',
  standalone: false,
  templateUrl: './parents-dashboard.component.html',
  styleUrls: ['./parents-dashboard.component.css']
})
export class ParentsDashboardComponent implements OnInit {
  language: string = 'EN';
  defaultLevel: string = 'easy';
  childrenList: any[] = [];
  userId: string | null = null;
  message: string = '';
  newChildName: string = ''; // Input for new child name
  newChildAge: number | null = null;
  newChildGender: string = '';

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.loadChildren();
      }
    });
  }

  // Load children data from Firestore
  loadChildren() {
    if (this.userId) {
      this.firestore
        .collection('users')
        .doc(this.userId)
        .collection('children')
        .valueChanges({ idField: 'id' })
        .subscribe((children) => {
          this.childrenList = children.map((child) => ({ ...child, isEditing: false }));
        });
    }
  }

  // Add a new child, preventing duplicate names
  addChild() {
    if (!this.newChildName || !this.newChildAge || !this.newChildGender) {
      this.message = 'All fields are required to add a child.';
      return;
    }

    const duplicateChild = this.childrenList.find(
      (child) => child.name.toLowerCase() === this.newChildName.toLowerCase()
    );

    if (duplicateChild) {
      this.message = 'A child with this name already exists. Please use a different name.';
      return;
    }

    if (this.userId) {
      const newChild = {
        name: this.newChildName,
        age: this.newChildAge,
        gender: this.newChildGender,
        progress: 'No progress available'
      };

      this.firestore
        .collection('users')
        .doc(this.userId)
        .collection('children')
        .add(newChild)
        .then(() => {
          this.message = 'Child has been added.';
          this.loadChildren();
          this.resetChildForm();
        })
        .catch((error) => {
          this.message = 'Error adding child: ' + error.message;
        });
    }
  }

  // Reset the child form
  resetChildForm() {
    this.newChildName = '';
    this.newChildAge = null;
    this.newChildGender = '';
  }

  // Other existing methods
  changeLanguage(lang: string) {
    this.language = lang;
  }

  setDefaultLevel(level: string) {
    this.defaultLevel = level;
  }

 // Start editing child
  startEditingChild(child: any) {
    child.originalName = child.name; // Store original name to check for duplicates later
    child.isEditing = true;
  }

  // Save edited child data
  saveChildData(child: any) {
    // Prevent duplicate names
    const duplicate = this.childrenList.find(
      (c) => c.id !== child.id && c.name.toLowerCase() === child.name.toLowerCase()
    );

    if (duplicate) {
      this.message = 'A child with this name already exists. Please use a different name.';
      return;
    }

    if (this.userId) {
      this.firestore
        .collection('users')
        .doc(this.userId)
        .collection('children')
        .doc(child.id)
        .update({ name: child.name, age: child.age, gender: child.gender })
        .then(() => {
          this.message = 'Child data updated successfully.';
          child.isEditing = false;
        })
        .catch((error) => {
          this.message = 'Error updating child data: ' + error.message;
        });
    }
  }

  // Cancel editing child data
  cancelEditingChild(child: any) {
    child.name = child.originalName; // Revert to original name
    child.isEditing = false;
    this.message = '';
  }

  deleteChild(childId: string) {
    if (this.userId) {
      this.firestore
        .collection('users')
        .doc(this.userId)
        .collection('children')
        .doc(childId)
        .delete()
        .then(() => {
          this.message = 'Child deleted successfully.';
        })
        .catch((error) => {
          this.message = 'Error deleting child: ' + error.message;
        });
    }
  }

  navigateToAddChild() {
    this.router.navigate(['/add-new-child']);
  }
}
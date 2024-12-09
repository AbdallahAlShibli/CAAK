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

  // Change language
  changeLanguage(lang: string) {
    this.language = lang;
  }

  // Set default level
  setDefaultLevel(level: string) {
    this.defaultLevel = level;
  }

  // Start editing child data
  startEditingChild(child: any) {
    child.isEditing = true;
  }

  // Save child data
  saveChildData(child: any) {
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
    child.isEditing = false;
    this.loadChildren(); // Reload data to revert changes
  }

  // Delete child
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

  navigateToAddChild(){
    this.router.navigate(['/add-new-child']);
  }
}

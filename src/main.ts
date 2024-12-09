import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firebase from 'firebase/compat/app';

if (environment.production) {
  enableProdMode();
}

// Initialize Firebase if not already done
if (!firebase.apps.length) {
  firebase.initializeApp(environment.firebaseConfig);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

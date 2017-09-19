import { ModuleWithProviders } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

const firebaseConfig = {
    apiKey: 'AIzaSyBynlgjishsgNugS1Zr_c0lzLYq89R9IuQ',
    authDomain: 'dtpickup-db355.firebaseapp.com',
    databaseURL: 'https://dtpickup-db355.firebaseio.com',
    storageBucket: 'gs://dtpickup-db355.appspot.com',
    //messagingSenderId: '<your-messaging-sender-id>'
}

export const FirebaseModule: ModuleWithProviders = AngularFireModule.initializeApp(firebaseConfig);
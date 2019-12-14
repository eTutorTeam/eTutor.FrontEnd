import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    public firebaseNative: Firebase,
    private platform: Platform
  ) { }
}

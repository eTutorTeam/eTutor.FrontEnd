import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import {Platform, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {DeviceTokenRequest} from "../models/device-token-request";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    public firebaseNative: Firebase,
    private platform: Platform,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) { }

  async getToken() {
    console.log('GET TOKEN () METHOD -- CALLING FIREBASE NATIVE CORDOVA')
    const token = await this.firebaseNative.getToken();
    console.log('TOKEN: ', token);
    const see = token;
    if (this.platform.is('ios')) {
      await this.firebaseNative.grantPermission();
    }

    return await this.saveTokenToUserBackend(token);
  }

  private async saveTokenToUserBackend(token) {
    if (!token) {
      return;
    }
    const device: DeviceTokenRequest = {
      fcmToken: token,
      platforms: this.platform.platforms()
    };
    console.log('PHONE TOKEN: ', token);
    return this.http.post(`${environment.apiBaseUrl}/api/users/devices`, device).toPromise();
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }

  registerToNotifications() {
    this.listenToNotifications().pipe(
        tap((msg: any) => {
          this.presentToast(msg.body)
              .then(res => console.log(res))
              .catch(err => console.error(err));
        })
    ).subscribe();
  }

  private async presentToast(msg: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });

    toast.present();
  }
}

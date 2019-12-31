import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import {Platform, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {DeviceTokenRequest} from "../../models/device-token-request";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    public firebaseNative: FirebaseX,
    private platform: Platform,
    private http: HttpClient,
    private toastCtrl: ToastController,
  ) {
  }

  async getToken() {
    console.log('GET TOKEN () METHOD -- CALLING FIREBASE NATIVE CORDOVA')
    let token = await this.firebaseNative.getToken();
    console.log('TOKEN: ', token);
    if (this.platform.is('ios')) {
      await this.firebaseNative.grantPermission();
      token = await this.firebaseNative.getAPNSToken();
    }
    this.listenToRefreshToken();
    return await this.saveTokenToUserBackend(token);
  }

  private async saveTokenToUserBackend(token) {
    if (!token) {
      return;
    }
    const device: DeviceTokenRequest = {
      fcmToken: token,
      platform: this.getPlatform()
    };
    console.log('PHONE TOKEN: ', token);
    return this.http.post(`${environment.apiBaseUrl}/api/users/devices`, device).toPromise();
  }


  private listenToRefreshToken() {
    this.firebaseNative.onTokenRefresh().subscribe(token => {
      this.saveTokenToUserBackend(token);
    })
  }

  private getPlatform(): string {
    if (this.platform.is('android')) {
      return 'android';
    }

    if (this.platform.is('ios')) {
      return 'ios'
    }

    return 'browser'
  }
}

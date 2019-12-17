import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

constructor(
  private firebase: FirebaseX,
  private toastController: ToastController
) {
 }

public listenWhenUserTapsNotification() {
  console.log('this method was instantiated');
  this.firebase.onMessageReceived().subscribe(data => {
    console.log('NOTIFICATION', data);

  })
}

private async presentNotificationToast(notification: any) {
  if (!notification.tap && notification.tap !== 'background') {
    const toast = this.toastController.create({
      message: notification.body,
      header: notification.title,
      position: 'top'
    })
  }
}

}

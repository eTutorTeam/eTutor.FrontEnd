import {Injectable} from '@angular/core';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AccountService} from "./accounts/account.service";
import {RoleTypes} from "../enums/role-types.enum";

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

constructor(
  private firebase: FirebaseX,
  private toastController: ToastController,
  private router: Router,
  private accountService: AccountService
) {}

public listenWhenUserTapsNotification() {
  console.log('this method was instantiated');
  this.firebase.onMessageReceived().subscribe(data => {
    this.handleNotification(data);
  })
}

private async handleNotification(notification: any) {
  if (!notification.tap && notification.tap !== 'background') {
    await this.showToastOnNotificationIfAppIsActive(notification);
  } else {
    await this.handleAppActionDependingOnNotification(notification);
  }
}

private async showToastOnNotificationIfAppIsActive(notification: any) {
  const toast = await this.toastController.create({
    message: notification.body,
    header: notification.title,
    position: 'top',
    buttons: [
      {
        side: 'end',
        icon: 'close',
        handler: () => {
          toast.dismiss();
        }
      },
      {
        side: 'end',
        icon: 'arrow-forward',
        handler: async () => {
          await this.handleAppActionDependingOnNotification(notification);
        }
      }
    ]
  });
  toast.present();

  setTimeout(async () => {
    toast.dismiss();
    await this.handleAppActionDependingOnNotification(notification);
  }, 15000);
}

  private async handleAppActionDependingOnNotification(notification: any) {
    if (notification.hasOwnProperty('meetingId')) {
      this.meetingNotification(notification.meetingId);
    }
  }

  private async meetingNotification(meetingId: number) {
    const isTutor = await this.accountService.checkIfUserHasRole(RoleTypes.Tutor);
    if (isTutor) {

    }
  }

}

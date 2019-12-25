import {Injectable} from '@angular/core';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AccountService} from "./accounts/account.service";
import {RoleTypes} from "../enums/role-types.enum";
import {ModalPagesService} from "./modal-pages.service";
import {TutorAcceptMeetingComponent} from "../tutors/tutors/tutor-accept-meeting/tutor-accept-meeting.component";
import {ToastNotificationService} from "./toast-notification.service";
import {NotificationTypesEnum} from "../enums/notification-types.enum";

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(
      private firebase: FirebaseX,
      private toastController: ToastController,
      private router: Router,
      private accountService: AccountService,
      private toastNotificationService: ToastNotificationService,
      private modalPagesService: ModalPagesService
  ) {}

  public listenWhenUserTapsNotification() {
    console.log('this method was instantiated');
    this.firebase.onMessageReceived().subscribe(data => {
      this.handleNotification(data);
    });
  }

  private async handleNotification(notification: any) {
    if (!notification.tap && notification.tap !== 'background') {
      await this.handleNotificationWhenAppIsActive(notification);
    } else {
      await this.handleAppActionDependingOnNotification(notification);
    }
  }

  private async handleNotificationWhenAppIsActive(notification: any) {
    if (this.getNotificationType(notification) === NotificationTypesEnum.NewSolicitedMeeting) {
      await this.meetingNotification(notification.meetingId);
    } else {
      console.log(JSON.stringify(notification), "NOTIFICATION");
      this.toastNotificationService.presentToast(notification.title, notification.body);
    }
  }

  private async handleAppActionDependingOnNotification(notification: any) {
    if (this.getNotificationType(notification) === NotificationTypesEnum.NewSolicitedMeeting) {
      await this.meetingNotification(notification.meetingId);
    }
  }

  private getNotificationType(notification: any): NotificationTypesEnum {
    if (notification.hasOwnProperty('newSolicitedMeetingId')) {
      return NotificationTypesEnum.NewSolicitedMeeting;
    }

    if (notification.hasOwnProperty('answeredMeetingId')) {
      return NotificationTypesEnum.AnsweredMeeting;
    }
  }

  private async meetingNotification(meetingId: number) {
    const isTutor = await this.accountService.checkIfUserHasRole(RoleTypes.Tutor);
    if (isTutor) {
      await this.modalPagesService.openModal(TutorAcceptMeetingComponent, {meetingId});
    }
  }

}

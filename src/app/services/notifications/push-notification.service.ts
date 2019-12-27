import {Injectable} from '@angular/core';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AccountService} from "../accounts/account.service";
import {RoleTypes} from "../../enums/role-types.enum";
import {ModalPagesService} from "../modal-pages.service";
import {TutorAcceptMeetingComponent} from "../../tutors/tutors/tutor-accept-meeting/tutor-accept-meeting.component";
import {ToastNotificationService} from "../toast-notification.service";
import {NotificationTypesEnum} from "../../enums/notification-types.enum";
import {AlertServiceService} from "../alert-service.service";
import {ParentApproveMeetingModalComponent} from "../../parents/parent-approve-meeting-modal/parent-approve-meeting-modal.component";

@Injectable({
  providedIn: 'root'
})

export class PushNotificationService {

  constructor(
      private firebase: FirebaseX,
      private toastController: ToastController,
      private router: Router,
      private alertService: AlertServiceService,
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
      await this.handleNotificationActionInForeground(notification);
    } else {
      await this.handleNotificationActionInBackground(notification);
    }
  }

  private async handleNotificationActionInForeground(notification: any) {
    console.log(notification);
    const notificationType = this.getNotificationType(notification);
    await this.handleNotificationSharedBehavior(notification);
  }

  private async handleNotificationActionInBackground(notification: any) {
    await this.handleNotificationSharedBehavior(notification);
  }

  private async handleNotificationSharedBehavior(notification: any) {
    const notificationType = this.getNotificationType(notification);

    if (notificationType === NotificationTypesEnum.NewSolicitedMeeting) {
      await this.meetingNotification(notification.newSolicitedMeetingId);

    } else if (notificationType === NotificationTypesEnum.ParentRejectedMeeting) {
      await this.rejectedMeetingNotification(notification.body);

    } else if (notificationType === NotificationTypesEnum.ParentMeeting) {
      await this.meetingSolicitedParentNotification(notification);

    } else {
      await this.presentNotificationToast(notification);
    }
  }

  private getNotificationType(notification: any): NotificationTypesEnum {
    if (notification.hasOwnProperty('newSolicitedMeetingId')) {
      return NotificationTypesEnum.NewSolicitedMeeting;
    }

    if (notification.hasOwnProperty('answeredMeetingId')) {
      return NotificationTypesEnum.AnsweredMeeting;
    }

    if (notification.hasOwnProperty('rejectedMeeting')) {
      return NotificationTypesEnum.ParentRejectedMeeting;
    }

    if (notification.hasOwnProperty('parentMeetingId')) {
      return NotificationTypesEnum.ParentMeeting;
    }
  }

  private async meetingSolicitedParentNotification(notification: any) {
    if (this.accountService.checkIfUserHasRole(RoleTypes.Parent)) {
      const meetingId = notification.parentMeetingId;
      await this.modalPagesService.openModal(ParentApproveMeetingModalComponent, {meetingId});
    }
  }

  private async rejectedMeetingNotification(message: string) {
    await this.toastNotificationService.presentToast('Tutoría Denegada', message);
  }

  private async meetingNotification(meetingId: number) {
    const isTutor = await this.accountService.checkIfUserHasRole(RoleTypes.Tutor);
    if (isTutor) {
      await this.modalPagesService.openModal(TutorAcceptMeetingComponent, {meetingId});
    }
  }

  private async presentNotificationToast(notification: any) {
    await this.toastNotificationService.presentToast(notification.title, notification.body);
  }

}

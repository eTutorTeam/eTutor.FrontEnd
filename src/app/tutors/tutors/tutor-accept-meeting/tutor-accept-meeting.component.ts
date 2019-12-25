import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {MeetingService} from "../../../services/data/meeting.service";
import {MeetingSummary} from "../../../models/meeting-summary";
import * as moment from 'moment';
import {LoadingService} from "../../../services/loading.service";
import {ToastNotificationService} from "../../../services/toast-notification.service";
import {AlertServiceService} from "../../../services/alert-service.service";

@Component({
  selector: 'app-tutor-accept-meeting',
  templateUrl: './tutor-accept-meeting.component.html',
  styleUrls: ['./tutor-accept-meeting.component.scss'],
})
export class TutorAcceptMeetingComponent implements OnInit {

  @Input() meetingId: number;
  meetingSummary: MeetingSummary;

  constructor(
      private modalCtrl: ModalController,
      private meetingService: MeetingService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService,
      private alertService: AlertServiceService
  ) { }

  get formatedDate(): string {
    const dt = this.meetingSummary.meetingDate;
    return moment(dt).format('LLLL');
  }

  get startTime(): string {
    const dt = this.meetingSummary.startTime;
    return moment(dt).format('hh:mm a');
  }

  get endTime(): string {
    const dt = this.meetingSummary.endTime;
    return moment(dt).format('hh:mm a');
  }

  ngOnInit() {
    this.getMeetingSummary(this.meetingId).catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  private async getMeetingSummary(meetingId: number) {
    await this.loadingService.startLoading();
    this.meetingSummary = await this.meetingService.getMeetingSummary(meetingId);
    this.loadingService.stopLoading();
  }

  closeModal() {
    if (this.meetingSummary === undefined) { return; }
    this.performCloseOperation().catch(err => {
      this.toastNotificationService.presentErrorToast(err);
      this.loadingService.stopLoading();
    });
  }

  private async performCloseOperation() {
    const res = await this.alertService.confirmationAlert();
    if (res) {
      await this.sendRejectMeetingRequest();
      await this.modalCtrl.dismiss();
    }
  }

  acceptMeeting() {

  }

  rejectMeeting() {
    this.sendRejectMeetingRequest().catch(err => {
      this.toastNotificationService.presentErrorToast(err);
      this.loadingService.stopLoading();
    });
  }

  private async sendRejectMeetingRequest() {
    await this.loadingService.startLoading('Rechazando Tutoría');

    this.loadingService.stopLoading();
    await this.toastNotificationService.presentToast('Exito!', 'La tutoría ha sido rechazada');
  }


}

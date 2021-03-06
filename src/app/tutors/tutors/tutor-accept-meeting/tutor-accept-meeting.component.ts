import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {MeetingService} from "../../../services/data/meeting.service";
import {MeetingSummary} from "../../../models/meeting-summary";
import * as moment from 'moment';
import {LoadingService} from "../../../services/loading.service";
import {ToastNotificationService} from "../../../services/toast-notification.service";
import {AlertServiceService} from "../../../services/alert-service.service";
import {MeetingStatusEnum} from "../../../enums/meeting-status.enum";
import {ModalPagesService} from "../../../services/modal-pages.service";
import { LocalNotificationService } from 'src/app/services/local-notification.service';
import {TutorMeetingService} from "../../../services/data/tutor-meeting.service";
import { MeetingResponse } from 'src/app/models/meeting-response';

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
      private tutorMeetingService: TutorMeetingService,
      private meetingService: MeetingService,
      private modalPagesService: ModalPagesService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService,
      private alertService: AlertServiceService,
      private localNotificationService: LocalNotificationService
  ) { }

  get formatedDate(): string {
    const dt = this.meetingSummary.meetingDate;
    return moment(dt).format('ddd D MMMM YYYY');
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
    this.sendAcceptMeetingRequest().catch(err => {
      this.toastNotificationService.presentErrorToast(err);
      this.loadingService.stopLoading();
    });
  }

  rejectMeeting() {
    this.sendRejectMeetingRequest().catch(err => {
      this.toastNotificationService.presentErrorToast(err);
      this.loadingService.stopLoading();
    });
  }

  private async sendAcceptMeetingRequest() {
    await this.loadingService.startLoading('Aceptando tutoría');
    await this.localNotificationService.scheduleNotification(this.meetingSummary.subjectName, this.meetingSummary.startTime)
    await this.tutorMeetingService.tutorSendMeetingResponse(this.meetingId, MeetingStatusEnum.Accepted);
    await this.toastNotificationService.presentToast('Exito!', 'La tutoría ha sido aceptada y agendada');
    this.modalPagesService.closeModal();
    await this.meetingService.getMeetingsForCalendar();
    this.loadingService.stopLoading();
  }

  private async sendRejectMeetingRequest() {
    await this.loadingService.startLoading('Rechazando Tutoría');
    await this.tutorMeetingService.tutorSendMeetingResponse(this.meetingId, MeetingStatusEnum.Rejected);
    await this.toastNotificationService.presentToast('Listo!', 'La tutoría ha sido rechazada');
    this.modalPagesService.closeModal();
    this.loadingService.stopLoading();
  }


}

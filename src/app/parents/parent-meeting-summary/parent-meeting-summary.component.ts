import {Component, Input, OnInit} from '@angular/core';
import {ParentMeetingResponse} from "../../models/parent-meeting-response";
import {ModalPagesService} from "../../services/modal-pages.service";
import {ParentMeetingService} from "../../services/data/parent-meeting.service";
import {LoadingService} from "../../services/loading.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {AlertServiceService} from "../../services/alert-service.service";
import * as moment from "moment";
import {ParentAuthorizationStatusEnum} from "../../enums/parent-authorization-status.enum";
import {ParentMeetingAnswer} from "../../models/parent-meeting-answer";
import {MeetingStatusEnum} from "../../enums/meeting-status.enum";
import {MeetingService} from "../../services/data/meeting.service";

@Component({
  selector: 'app-parent-meeting-summary',
  templateUrl: './parent-meeting-summary.component.html',
  styleUrls: ['./parent-meeting-summary.component.scss'],
})
export class ParentMeetingSummaryComponent implements OnInit {

  @Input() meetingId: number;
  meeting: ParentMeetingResponse;
  status = MeetingStatusEnum;

  constructor(
      private modalPageService: ModalPagesService,
      private parentMeetingService: ParentMeetingService,
      private meetingService: MeetingService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit() {
    this.getMeeting();
  }

  get startTime() {
    return moment(this.meeting.startDateTime).format('LLLL');
  }

  get endTime() {
    return moment(this.meeting.endDateTime).format('LLLL');
  }

  get tutor() {
    return this.meeting.tutor;
  }

  get subject() {
    return this.meeting.subject;
  }

  get student() {
    return this.meeting.student;
  }

  getMeeting() {
    this.getMeetingRequest().catch(err => {
      this.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
      this.closeModal();
    });
  }

  private async getMeetingRequest() {
    await this.startLoading();
    this.meeting = await this.parentMeetingService.getMeetingSummary(this.meetingId);
    this.stopLoading();
  }

  cancel() {
    this.cancelMeetingRequest().catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  private async cancelMeetingRequest() {
    await this.loadingService.startLoading('Cancelando Tutoria...');
    await this.meetingService.cancelMeeting(this.meetingId);
    this.closeModal();
    this.loadingService.stopLoading();
  }

  closeModal() {
    this.modalPageService.closeModal();
  }

  private async startLoading() {
    await this.loadingService.startLoading('Buscando datos de la tutoría solicitada');
  }

  private stopLoading() {
    this.loadingService.stopLoading();
  }

}

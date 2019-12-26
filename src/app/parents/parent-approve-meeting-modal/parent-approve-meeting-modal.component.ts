import {Component, Input, OnInit} from '@angular/core';
import {ModalPagesService} from "../../services/modal-pages.service";
import * as moment from "moment";
import {ParentMeetingResponse} from "../../models/parent-meeting-response";
import {ParentMeetingService} from "../../services/data/parent-meeting.service";
import {LoadingService} from "../../services/loading.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {ParentAuthorizationStatusEnum} from "../../enums/parent-authorization-status.enum";
import {AlertServiceService} from "../../services/alert-service.service";
import {ParentMeetingAnswer} from "../../models/parent-meeting-answer";

@Component({
  selector: 'app-parent-aprrove-meeting-modal',
  templateUrl: './parent-approve-meeting-modal.component.html',
  styleUrls: ['./parent-approve-meeting-modal.component.scss'],
})
export class ParentApproveMeetingModalComponent implements OnInit {

  @Input() meetingId: number;
  meeting: ParentMeetingResponse;

  constructor(
      private modalPageService: ModalPagesService,
      private parentMeetingService: ParentMeetingService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService,
      private alertService: AlertServiceService
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
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
      this.closeModal();
    });
  }

  private async getMeetingRequest() {
    await this.loadingService.startLoading('Buscando datos de la tutoría solicitada');
    this.meeting = await this.parentMeetingService.getMeetingSummary(this.meetingId);
    this.loadingService.stopLoading();
  }

  reject() {
    this.answerRequest(ParentAuthorizationStatusEnum.Rejected).catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
      this.closeModal();
    });
  }

  private async answerRequest(answeredStatus: ParentAuthorizationStatusEnum) {
    await this.loadingService.startLoading('Respondiendo a tutoría solicitada');
    let reason = '';
    if (answeredStatus === ParentAuthorizationStatusEnum.Rejected) {
      reason = await this.alertService.inputAlert('Puede indicar una razón para la denegación.', 'Agregar Razón', 'Responder sin razón');
    }

    const model: ParentMeetingAnswer = {
      reason,
      statusAnswer: answeredStatus
    };

    await this.parentMeetingService.respondToPendingMeeting(this.meetingId, model);
  }

  approve() {
    this.answerRequest(ParentAuthorizationStatusEnum.Approved).catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
      this.closeModal();
    });
  }

  closeModal() {
    this.modalPageService.closeModal();
  }

  async close() {
    const confirmed = await this.alertService.confirmationAlert('¿Está seguro que desea salir de esta pantalla?', 'Si', 'No');
    if (confirmed) {this.closeModal(); }
  }

}

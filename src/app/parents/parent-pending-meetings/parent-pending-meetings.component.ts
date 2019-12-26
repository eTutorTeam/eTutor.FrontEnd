import { Component, OnInit } from '@angular/core';
import {ParentMeetingResponse} from "../../models/parent-meeting-response";
import {ParentMeetingService} from "../../services/data/parent-meeting.service";
import {LoadingService} from "../../services/loading.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {ModalPagesService} from "../../services/modal-pages.service";
import {ParentApproveMeetingModalComponent} from "../parent-approve-meeting-modal/parent-approve-meeting-modal.component";
import * as moment from 'moment';

@Component({
  selector: 'app-parent-pending-meetings',
  templateUrl: './parent-pending-meetings.component.html',
  styleUrls: ['./parent-pending-meetings.component.scss'],
})
export class ParentPendingMeetingsComponent implements OnInit {

  meetings: ParentMeetingResponse[] = [];

  constructor(
      private parentMeetingService: ParentMeetingService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService,
      private modalPageService: ModalPagesService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getMeetings();
  }

  meetingSelected(meetingId: number) {
    this.openApproveMeetingModal(meetingId).catch(err => {
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  formatAsLongDate(date: Date) {
    return moment(date).format('LLLL h:mm a');
  }

  getDurationBetweenDates(startDate: Date, endDate: Date) {
    return moment(startDate).from(endDate);
  }

  private async openApproveMeetingModal(meetingId: number) {
    await this.modalPageService.openModal(ParentApproveMeetingModalComponent, {meetingId});
    this.getMeetings(); 
  }

  private getMeetings() {
    this.getMeetingsRequest().catch(err => {
      this.loadingService.stopLoading();
      console.log(err);
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  private async getMeetingsRequest() {
    await this.loadingService.startLoading('Buscando las tutorías pendientes por aprobar');
    this.meetings = await this.parentMeetingService.getPendingMeetings();
    this.loadingService.stopLoading();
  }

}

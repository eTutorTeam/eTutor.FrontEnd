import {Component, Input, OnInit} from '@angular/core';
import {ModalPagesService} from "../../services/modal-pages.service";
import {SubjectSimpleResponse} from "../../models/subject-simple-response";
import {TutorSimpleResponse} from "../../models/tutor-simple-response";
import * as moment from "moment";
import {ParentMeetingResponse} from "../../models/parent-meeting-response";
import {ParentMeetingService} from "../../services/data/parent-meeting.service";
import {LoadingService} from "../../services/loading.service";
import {ToastNotificationService} from "../../services/toast-notification.service";

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
      private toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit() {}

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

  reject() {

  }

  approve() {

  }

  closeModal() {
    this.modalPageService.closeModal();
  }

}

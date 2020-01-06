import {Component, Input, OnInit} from '@angular/core';
import {ModalPagesService} from "../../services/modal-pages.service";
import {LoadingService} from "../../services/loading.service";
import {MeetingService} from "../../services/data/meeting.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {MeetingSummary} from "../../models/meeting-summary";
import {RoleTypes} from "../../enums/role-types.enum";
import {AccountService} from "../../services/accounts/account.service";

@Component({
  selector: 'calendar-meeting-summary',
  templateUrl: './calendar-meeting-summary.component.html',
  styleUrls: ['./calendar-meeting-summary.component.scss'],
})

export class CalendarMeetingSummaryComponent implements OnInit {

  @Input() meetingId: number;
  meetingSummary: MeetingSummary;
  roles = RoleTypes;
  currentRole: RoleTypes;

  constructor(
      private modalPageService: ModalPagesService,
      private loadingService: LoadingService,
      private meetingService: MeetingService,
      private accountService: AccountService,
      private toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit() {
    this.getMeeting();
  }

  get stringified() {
    return JSON.stringify(this.meetingSummary);
  }

  private getMeeting() {
    this.getMeetingRequest().catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  private async getMeetingRequest() {
    this.loadingService.startLoading('Buscando datos tutoría');
    this.meetingSummary = await this.meetingService.getMeetingSummary(this.meetingId);
    const roles = await this.accountService.getRolesForUser();
    this.currentRole = roles[0];
    this.loadingService.stopLoading();
  }

  closeModal() {
    this.modalPageService.closeModal();
  }

}

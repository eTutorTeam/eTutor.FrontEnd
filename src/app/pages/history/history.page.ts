import { Component, OnInit } from '@angular/core';
import {HistoryMeetingResponse} from "../../models/history-meeting-response";
import {RoleTypes} from "../../enums/role-types.enum";
import {MeetingService} from "../../services/data/meeting.service";
import {AccountService} from "../../services/accounts/account.service";
import {LoadingService} from "../../services/loading.service";
import {ToastNotificationService} from "../../services/toast-notification.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  items: HistoryMeetingResponse[] = [];
  role: RoleTypes;

  constructor(
      private meetingService: MeetingService,
      private accountService: AccountService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService
  ) { }

  ionViewDidEnter() {
    this.loadingService.startLoading('Buscando historial...');
    this.getPageData().then(res => {
      this.loadingService.stopLoading();
    }).catch(err => {
      this.toastNotificationService.presentErrorToast(err);
      this.loadingService.stopLoading();
    });
  }

  ngOnInit() {
  }

  private async getPageData() {
    await this.getHistoriesRequest();
    await this.getUserRoles();

  }

  private async getHistoriesRequest() {
    this.items = await this.meetingService.getMeetingsHistory();
  }

  private async getUserRoles() {
    const roles = await this.accountService.getRolesForUser();
    this.role = roles[0];
  }







}

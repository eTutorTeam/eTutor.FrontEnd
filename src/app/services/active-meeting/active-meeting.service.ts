import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {MeetingService} from "../data/meeting.service";
import {MeetingInProgressResponse} from "../../models/meeting-in-progress-response";
import {ModalPagesService} from "../modal-pages.service";
import {StarsRatingModalPage} from "../../pages/stars-rating-modal/stars-rating-modal.page";
import {AccountService} from "../accounts/account.service";
import {RoleTypes} from "../../enums/role-types.enum";

@Injectable({
  providedIn: 'root'
})
export class ActiveMeetingService {

  activeMeeting = true;
  meeting: MeetingInProgressResponse;

  constructor(
      private router: Router,
      private meetingService: MeetingService,
      private modalPageService: ModalPagesService,
      private accountService: AccountService
  ) { }

  goToActiveMeetingPage() {
    this.router.navigate(['meeting-in-course']);
  }

  async goToHome() {
    await this.router.navigate(['home']);
  }

  getCurrentActiveMeeting() {
    return new Promise((resolve, reject) =>  {
      this.meetingService.getMeetingInProgress().then((res: MeetingInProgressResponse) => {
        this.activeMeeting = true;
        this.meeting = res;
        resolve();
      }).catch((err) => {
        this.meeting = undefined;
        this.activeMeeting = false;
        reject();
      });
    });
  }

  openRatinsModal(meetingId: number) {
    this.openRatingsModalPage(meetingId);
  }

  private async openRatingsModalPage(meetingId: number) {
    const roles = await this.accountService.getRolesForUser();
    const role = roles[0];
    if (role !== RoleTypes.Parent) {
      await this.modalPageService.openModal(StarsRatingModalPage, {meetingId});
    }
  }


}


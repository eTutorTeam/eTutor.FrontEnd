import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from "../../services/accounts/account.service";
import {RoleTypes} from "../../enums/role-types.enum";
import {ScheduledMeetingsComponent} from "../../components/scheduled-meetings/scheduled-meetings.component";
import {MeetingService} from "../../services/data/meeting.service";
import {ModalPagesService} from "../../services/modal-pages.service";
import {CalendarMeetingSummaryComponent} from "../../components/calendar-meeting-summary/calendar-meeting-summary.component";
import {ActiveMeetingService} from "../../services/active-meeting/active-meeting.service";
import {RatingsService} from "../../services/data/ratings.service";
import {ToastNotificationService} from "../../services/toast-notification.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isLoading = true;
  isStudent = false;
  @ViewChild(ScheduledMeetingsComponent, {static: true}) meetingsCompontent: ScheduledMeetingsComponent;

  constructor(
      public router: Router,
      private accountService: AccountService,
      private meetingService: MeetingService,
      private modalPageService: ModalPagesService,
      private activeMeetingService: ActiveMeetingService,
      private ratingService: RatingsService,
      private toastNotificationService: ToastNotificationService,
  ) {}

  ionViewWillEnter() {
    this.reroute();
    this.checkIfUserIsStudent();
    this.meetingService.getMeetingsForCalendar();
  }

  ngOnInit() {

  }

  selectedMeeting(meetingId: number) {
    this.modalPageService.openModal(CalendarMeetingSummaryComponent, {meetingId}).then(() => {
      this.meetingService.getMeetingsForCalendar();
    });
  }

  private reroute() {
    this.isLoading = true;
    this.rerouteDependingOnRole()
        .catch(err => {
            this.isLoading = false;
          });
  }

  private async rerouteDependingOnRole() {
    if (await this.accountService.checkIfUserHasRole(RoleTypes.Parent)) {
      await this.router.navigate(['parents']);
      this.isLoading = false;
      return;
    }

    if (await this.accountService.checkIfUserHasRole(RoleTypes.Tutor)) {
      await this.router.navigate(['tutors']);
    }
    this.isLoading = false;
    await this.checkIfHasActiveMeeting();
    //await this.checkIfHasPendingRating();
  }

  private async checkIfHasActiveMeeting() {
    await this.activeMeetingService.getCurrentActiveMeeting();
    if (this.activeMeetingService.activeMeeting) {
      this.activeMeetingService.goToActiveMeetingPage();
    }
  }

  private async checkIfHasPendingRating() {
    const meeting = await this.ratingService.getPendingMeetingToRate();
    if (meeting !== null && meeting !== undefined) {
      this.activeMeetingService.openRatinsModal(meeting.meetingId);
    }
  }

  private async checkIfUserIsStudent() {
    this.isStudent = await this.accountService.checkIfUserHasRole(RoleTypes.Student);
  }

}

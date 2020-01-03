import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from "../../services/accounts/account.service";
import {RoleTypes} from "../../enums/role-types.enum";
import {ScheduledMeetingsComponent} from "../../components/scheduled-meetings/scheduled-meetings.component";
import {MeetingService} from "../../services/data/meeting.service";

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
      private meetingService: MeetingService
  ) {}

  ionViewWillEnter() {
    this.reroute();
    this.checkIfUserIsStudent();
    this.meetingService.getMeetingsForCalendar();
  }

  ngOnInit() {

  }

  private reroute() {
    this.isLoading = true;
    this.rerouteDependingOnRole().catch(err => {
      this.isLoading = false;
    });
  }

  private async rerouteDependingOnRole() {
    if (await this.accountService.checkIfUserHasRole(RoleTypes.Tutor)) {
      await this.router.navigate(['tutors']);
    }

    if (await this.accountService.checkIfUserHasRole(RoleTypes.Parent)) {
      await this.router.navigate(['parents']);
    }

    this.isLoading = false;
  }

  private async checkIfUserIsStudent() {
    this.isStudent = await this.accountService.checkIfUserHasRole(RoleTypes.Student);
  }

}

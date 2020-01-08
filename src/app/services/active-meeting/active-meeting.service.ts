import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {MeetingService} from "../data/meeting.service";
import {MeetingInProgressResponse} from "../../models/meeting-in-progress-response";

@Injectable({
  providedIn: 'root'
})
export class ActiveMeetingService {

  activeMeeting = true;
  meeting: MeetingInProgressResponse;

  constructor(
      private router: Router,
      private meetingService: MeetingService,
  ) { }

  goToActiveMeetingPage() {
    this.router.navigate(['meeting-in-course']);
  }

  goToHome() {
    this.router.navigate(['home']);
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


}


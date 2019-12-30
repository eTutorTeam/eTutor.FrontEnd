import { Component, OnInit } from '@angular/core';
import {MeetingSummary} from "../../../models/meeting-summary";
import {TutorSimpleResponse} from "../../../models/tutor-simple-response";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentMeetingService} from "../../../services/data/student-meeting.service";
import {LoadingService} from "../../../services/loading.service";
import {ToastNotificationService} from "../../../services/toast-notification.service";
import {MeetingService} from "../../../services/data/meeting.service";
import * as moment from 'moment';
import {TutorsService} from "../../../services/data/tutors.service";

@Component({
  selector: 'app-student-reschedule-summary',
  templateUrl: './student-reschedule-summary.component.html',
  styleUrls: ['./student-reschedule-summary.component.scss'],
})
export class StudentRescheduleSummaryComponent implements OnInit {

  meeting: MeetingSummary;
  newTutor: TutorSimpleResponse;

  meetingId = '';
  tutorId = '';

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private studentMeetingService: StudentMeetingService,
      private meetingService: MeetingService,
      private tutorsService: TutorsService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService
  ) { }

  get startTime() {
    return moment(this.meeting.startTime).format('LLLL');
  }

  get endTime() {
    return moment(this.meeting.endTime).format('LLLL');
  }

  ngOnInit() {
    this.loadScreen();
  }

  cancel() {
    this.loadingService.startLoading();
    this.studentMeetingService.cancelMeeting(this.meetingId).then(res => {
      this.loadingService.stopLoading();
      this.router.navigate(['home']);
    }).catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  submitMeeting() {
    this.loadingService.startLoading('Reagendando la tutoría');
    const meetingId = parseInt(this.meetingId, 10);
    this.studentMeetingService.rescheduleMeeting(meetingId, this.newTutor.id).then(res => {
      this.loadingService.stopLoading();
      this.router.navigate(['home']);
    }).catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  private loadScreen() {
    this.getParams();
    this.getRequests()
        .then(() => {
          this.loadingService.stopLoading();
        })
        .catch(err => {
          this.loadingService.stopLoading();
          this.toastNotificationService.presentErrorToast(err);
        });
  }

  private async getRequests() {
    this.loadingService.startLoading();
    this.meeting = await this.meetingService.getMeetingSummary(parseInt(this.meetingId, 10));
    this.newTutor = await this.tutorsService.getTutorById(parseInt(this.tutorId, 10));
    this.loadingService.stopLoading();
  }

  private getParams() {
    this.meetingId = this.route.snapshot.paramMap.get('meetingId');
    this.tutorId = this.route.snapshot.paramMap.get('tutorId');
  }
}

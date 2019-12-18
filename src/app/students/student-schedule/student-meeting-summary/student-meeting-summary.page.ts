import { Component, OnInit } from '@angular/core';
import {TutorsService} from "../../../services/data/tutors.service";
import {SubjectsService} from "../../../services/data/subjects.service";
import {LoadingService} from "../../../services/loading.service";
import {ToastNotificationService} from "../../../services/toast-notification.service";
import {SchedulingService} from "../../../services/data/scheduling.service";
import {SubjectSimpleResponse} from "../../../models/subject-simple-response";
import {TutorSimpleResponse} from "../../../models/tutor-simple-response";
import {MeetingService} from "../../../services/data/meeting.service";
import {MeetingRequest} from "../../../models/meeting-request";
import * as moment from 'moment';

@Component({
  selector: 'app-student-meeting-summary',
  templateUrl: './student-meeting-summary.page.html',
  styleUrls: ['./student-meeting-summary.page.scss'],
})
export class StudentMeetingSummaryPage implements OnInit {

  tutorId = 5;
  subjectId = 3;
  startDateTime = new Date();
  endDateTime = new Date();
  subject: SubjectSimpleResponse;
  tutor: TutorSimpleResponse;

  constructor(
      private tutorService: TutorsService,
      private subjectService: SubjectsService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService,
      private meetingService: MeetingService,
      private schedulingService: SchedulingService
  ) { }

  ngOnInit() {
    this.loadComponent().then(res => {
      this.loadingService.stopLoading();
    }).catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  get startTime() {
    return moment(this.startDateTime).format('LLLL');
  }

  get endTime() {
    return moment(this.endDateTime).add(2, 'hour').format('LLLL');
  }

  submitMeetingBtn() {

  }

  private async submitMeeting() {

  }

  private buildMeeting(): MeetingRequest {
    return {
      tutorId: this.tutorId,
      subjectId: this.subjectId,
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime
    };
  }

  private async loadComponent() {
    await this.loadingService.startLoading();
    this.getParameters();
    await this.getSubject();
    await this.getTutor();
  }

  private getParameters() {

  }

  private async getSubject() {
    this.subject = await this.subjectService.getSubjectById(this.subjectId);
  }

  private async getTutor() {
    this.tutor = await this.tutorService.getTutorById(this.tutorId);
  }
}

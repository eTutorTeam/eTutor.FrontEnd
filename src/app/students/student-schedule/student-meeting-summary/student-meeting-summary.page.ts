import { Component, OnInit } from '@angular/core';
import {TutorsService} from "../../../services/data/tutors.service";
import {SubjectsService} from "../../../services/data/subjects.service";
import {LoadingService} from "../../../services/loading.service";
import {ToastNotificationService} from "../../../services/toast-notification.service";
import {SchedulingService} from "../../../services/data/scheduling.service";
import {SubjectSimpleResponse} from "../../../models/subject-simple-response";
import {TutorSimpleResponse} from "../../../models/tutor-simple-response";
import {MeetingService} from "../../../services/data/meeting.service";
import {MeetingStudentRequest} from "../../../models/meeting-student-request";
import * as moment from 'moment';
import {Router} from "@angular/router";
import {AlertServiceService} from "../../../services/alert-service.service";

@Component({
  selector: 'app-student-meeting-summary',
  templateUrl: './student-meeting-summary.page.html',
  styleUrls: ['./student-meeting-summary.page.scss'],
})
export class StudentMeetingSummaryPage implements OnInit {

  tutorId: number;
  subjectId: number;
  startDateTime: Date;
  endDateTime: Date;
  subject: SubjectSimpleResponse;
  tutor: TutorSimpleResponse;

  constructor(
      private tutorService: TutorsService,
      private subjectService: SubjectsService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService,
      private meetingService: MeetingService,
      private alertService: AlertServiceService,
      private router: Router,
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
    return moment(this.endDateTime).format('LLLL');
  }

  cancel() {
    this.alertService.confirmationAlert('Está seguro de que no quiere agendar esta tutoría?',
        'Cancelar Tutoria', 'Quedarse Aquí').then(res => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }

  submitMeetingBtn() {
    this.submitMeeting().catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  private async submitMeeting() {
    await this.loadingService.startLoading('Su tutoria está siendo agendada');
    const data = this.buildMeeting();
    const res = await this.meetingService.createMeeting(data);
    this.router.navigate(['/home']);
    this.loadingService.stopLoading();
  }

  private buildMeeting(): MeetingStudentRequest {
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
    const meetingObj = this.schedulingService.getMeetingObject();
    this.tutorId = meetingObj.tutorId;
    this.subjectId = meetingObj.subjectId;
    this.startDateTime = meetingObj.startDateTime;
    this.endDateTime = meetingObj.endDateTime;
  }

  private async getSubject() {
    this.subject = await this.subjectService.getSubjectById(this.subjectId);
  }

  private async getTutor() {
    this.tutor = await this.tutorService.getTutorById(this.tutorId);
  }
}

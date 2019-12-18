import { Component, OnInit } from '@angular/core';
import {TutorsService} from "../../../services/data/tutors.service";
import {SubjectsService} from "../../../services/data/subjects.service";
import {LoadingService} from "../../../services/loading.service";
import {ToastNotificationService} from "../../../services/toast-notification.service";
import {SchedulingService} from "../../../services/data/scheduling.service";
import {SubjectSimpleResponse} from "../../../models/subject-simple-response";
import {TutorSimpleResponse} from "../../../models/tutor-simple-response";

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

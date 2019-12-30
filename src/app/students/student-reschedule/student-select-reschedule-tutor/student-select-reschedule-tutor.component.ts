import { Component, OnInit } from '@angular/core';
import {StudentMeetingService} from "../../../services/data/student-meeting.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../../../services/loading.service";
import {ToastNotificationService} from "../../../services/toast-notification.service";
import {TutorSimpleResponse} from "../../../models/tutor-simple-response";

@Component({
  selector: 'app-student-select-reschedule-tutor',
  templateUrl: './student-select-reschedule-tutor.component.html',
  styleUrls: ['./student-select-reschedule-tutor.component.scss'],
})
export class StudentSelectRescheduleTutorComponent implements OnInit {

  meetingId = '0';
  tutors: TutorSimpleResponse[] = [];
  isLoading = false;
  constructor(
      private studentMeetingService: StudentMeetingService,
      private router: Router,
      private route: ActivatedRoute,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService
  ) { }

  ionViewWillEnter() {
    this.loadScreen();
  }

  ngOnInit() {
    this.loadScreen();
  }

  private loadScreen() {
    this.getParams();
    this.getTutors();
  }

  private getTutors() {
    this.getTutorsRequest().catch(err => {
      this.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  private async getTutorsRequest() {
    await this.startLoading();
    if (this.meetingId === undefined) {
      throw new Error('No fue especificado el ID de la tutoría a ser agendada');
    }

    this.tutors = await this.studentMeetingService.getNotSelectedTutorsInMeetingForStudent(this.meetingId);
    this.stopLoading();
  }


  tutorSelected(tutorId: number) {
    this.router.navigate([`students/reschedule/${this.meetingId}/summary/${tutorId}`]);
  }

  private getParams() {
    this.meetingId = this.route.snapshot.paramMap.get('meetingId');
  }

  private async startLoading() {
    this.isLoading = true;
    await this.loadingService.startLoading('Buscando más tutores');
  }

  private stopLoading() {
    this.loadingService.stopLoading();
    this.isLoading = false;
  }

}

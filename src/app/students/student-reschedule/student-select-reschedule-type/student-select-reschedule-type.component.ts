import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertServiceService} from "../../../services/alert-service.service";
import {StudentMeetingService} from "../../../services/data/student-meeting.service";
import {LoadingService} from "../../../services/loading.service";
import {ToastNotificationService} from "../../../services/toast-notification.service";

@Component({
  selector: 'app-student-select-reschedule-type',
  templateUrl: './student-select-reschedule-type.component.html',
  styleUrls: ['./student-select-reschedule-type.component.scss'],
})
export class StudentSelectRescheduleTypeComponent implements OnInit {

  meetingId = '0';

  constructor(
      private router: Router,
      private alertService: AlertServiceService,
      private route: ActivatedRoute,
      private studentMeetingService: StudentMeetingService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService
  ) { }

  ionViewDidEnter() {
    this.getParams();
  }

  ngOnInit() {
    this.getParams();
  }

  async selectTutor() {
    await this.router.navigate([`students/reschedule/${this.meetingId}/tutor-select`]);
  }

  randomTutor() {
    this.getRandomTutorRequest().catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  cancel() {
    this.cancelRequest().catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  private async cancelRequest() {
    await this.loadingService.startLoading('Cancelando Tutoría');
    await this.studentMeetingService.cancelMeeting(this.meetingId);
    await this.router.navigate(['home']);
    this.loadingService.stopLoading();
  }

  private async getRandomTutorRequest() {
    await this.loadingService.startLoading('Escogiendo un tutor aleatorio para usted');
    const tutor = await this.studentMeetingService.getRandomTutorForStudentInRejectedMeeting(this.meetingId);
    await this.router.navigate([`students/reschedule/${this.meetingId}/summary/${tutor.id}`]);
    this.loadingService.stopLoading();
  }

  private getParams() {
    this.meetingId = this.route.snapshot.paramMap.get('meetingId');
  }

}

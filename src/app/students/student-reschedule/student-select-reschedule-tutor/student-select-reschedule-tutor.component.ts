import { Component, OnInit } from '@angular/core';
import {StudentMeetingService} from "../../../services/data/student-meeting.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SchedulingService} from "../../../services/data/scheduling.service";
import {LoadingService} from "../../../services/loading.service";
import {ToastNotificationService} from "../../../services/toast-notification.service";
import {TutorSimpleResponse} from "../../../models/tutor-simple-response";

@Component({
  selector: 'app-student-select-reschedule-tutor',
  templateUrl: './student-select-reschedule-tutor.component.html',
  styleUrls: ['./student-select-reschedule-tutor.component.scss'],
})
export class StudentSelectRescheduleTutorComponent implements OnInit {

  meetingId = 0;
  tutors: TutorSimpleResponse[] = [];
  constructor(
      private studentMeetingService: StudentMeetingService,
      private router: Router,
      private route: ActivatedRoute,
      private schedulingService: SchedulingService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit() {}

  getTutors() {
    this.getTutorsRequest().catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  private async getTutorsRequest() {
    await this.loadingService.startLoading('Buscando más tutores');
    if (this.meetingId === undefined) {
      throw new Error('No fue especificado el ID de la tutoría a ser agendada');
    }

    this.tutors = await this.studentMeetingService.getNotSelectedTutorsInMeetingForStudent(this.meetingId);
    this.loadingService.stopLoading();
  }


  tutorSelected(tutorId: number) {

  }

}

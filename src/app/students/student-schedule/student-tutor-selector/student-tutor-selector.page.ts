import { Component, OnInit } from '@angular/core';
import {SchedulingService} from "../../../services/data/scheduling.service";
import {LoadingService} from "../../../services/loading.service";
import {ToastNotificationService} from "../../../services/toast-notification.service";
import {UserAdminResponse} from "../../../models/user-admin-response";
import {TutorsService} from "../../../services/data/tutors.service";
import {TutorSimpleResponse} from "../../../models/tutor-simple-response";

@Component({
  selector: 'app-student-tutor-selector',
  templateUrl: './student-tutor-selector.page.html',
  styleUrls: ['./student-tutor-selector.page.scss'],
})
export class StudentTutorSelectorPage implements OnInit {

  subjectId: number;
  missingData = false;
  tutors: TutorSimpleResponse[] = [];

  constructor(
      private schedulingService: SchedulingService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService,
      private tutorsService: TutorsService
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
    this.getParams();
    this.checkIfMissingData();
    await this.loadingService.startLoading('Buscando a tus posibles tutores');
    if (!this.missingData) {
      await this.getTutors();
    }
    this.loadingService.stopLoading();
  }

  private getParams() {
    this.subjectId = this.schedulingService.subjectId;
  }

  private async getTutors() {
    this.tutors = await this.tutorsService.getTutorsForSubject(this.subjectId);
    console.log('TUTORS', this.tutors);
  }

  private checkIfMissingData() {
    if (this.subjectId === null || this.subjectId === undefined) {
      this.missingData = true;
    } else {
      this.missingData = false;
    }
  }

}

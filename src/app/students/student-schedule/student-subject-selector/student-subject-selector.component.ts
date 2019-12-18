import { Component, OnInit } from '@angular/core';
import {LoadingService} from "../../../services/loading.service";
import {ToastNotificationService} from "../../../services/toast-notification.service";
import {SubjectsService} from "../../../services/data/subjects.service";
import {SubjectResponse} from "../../../models/subject-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student-subject-selector',
  templateUrl: './student-subject-selector.component.html',
  styleUrls: ['./student-subject-selector.component.scss'],
})
export class StudentSubjectSelectorComponent implements OnInit {

  subjects: SubjectResponse[] = [];

  constructor(
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService,
      private subjectService: SubjectsService,
      private router: Router
  ) { }

  ngOnInit() {
    this.loadData().catch(err => {
      this.toastNotificationService.presentErrorToast(err);
      this.loadingService.stopLoading();
    });
  }


  selectSubjet(subjectId: number) {
    this.navigateOnSubjectSelected(subjectId)
        .catch(err => {this.toastNotificationService.presentErrorToast(err); });
  }

  private async navigateOnSubjectSelected(subjectId: number) {
   await this.router.navigate(['/students/schedule/datetime', subjectId]);
  }

  private async loadData() {
    await this.loadingService.startLoading('Estamos buscando las materias');
    await this.loadSubjects();
    this.loadingService.stopLoading();
  }

  private async loadSubjects() {
    this.subjects = await this.subjectService.getAllSubjects();
  }

}

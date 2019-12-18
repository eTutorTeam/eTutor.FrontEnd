import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastNotificationService} from "../../../services/toast-notification.service";
import {SchedulingService} from "../../../services/data/scheduling.service";

@Component({
  selector: 'app-student-datetime-selector',
  templateUrl: './student-datetime-selector.page.html',
  styleUrls: ['./student-datetime-selector.page.scss'],
})
export class StudentDatetimeSelectorPage implements OnInit {

  today = moment(Date.now()).toISOString();
  endDate = moment(Date.now()).add(30, 'days').toISOString();

  subjectId = '0';

  dateForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private toastNotificationService: ToastNotificationService,
      private schedulingService: SchedulingService
  ) { }

  ngOnInit() {
    this.buildComponent();
  }

  submitForm() {
    if (this.dateForm.valid) {
      const val = this.dateForm.value;
      const date = new Date(val.date);
      const startTime = new Date(val.startTime);
      const endTime = new Date(val.endTime);
      const startDateTime = new Date(date.setUTCHours(startTime.getHours(), startTime.getMinutes(), 0));
      const endDateTime = new Date(date.setUTCHours(endTime.getHours(), endTime.getMinutes(), 0));
      if (startDateTime > endDateTime) {
        this.toastNotificationService.presentToast('Ups', 'La hora de final no puede ser menor a la hora de inicio');
        return;
      }

      this.schedulingService.setSubjectAndDateData(this.subjectId, startDateTime, endDateTime);
      this.router.navigate(['students/schedule/tutor']);
    }
  }


  private buildComponent() {
    this.getSubjectIdParam();
    this.buildForm();
  }

  private buildForm() {
    this.dateForm = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  private getSubjectIdParam() {
    this.subjectId = this.route.snapshot.paramMap.get('subjectId');
  }



}

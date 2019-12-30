import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentReschedulePage } from './student-reschedule.page';
import {ComponentsModule} from "../../components/components.module";
import {StudentSelectRescheduleTutorComponent} from "./student-select-reschedule-tutor/student-select-reschedule-tutor.component";
import {StudentTutorsListComponent} from "../student-tutors-list/student-tutors-list.component";
import {StudentSelectRescheduleTypeComponent} from "./student-select-reschedule-type/student-select-reschedule-type.component";
import {StudentRescheduleSummaryComponent} from "./student-reschedule-summary/student-reschedule-summary.component";

const routes: Routes = [
  {
    path: '',
    component: StudentReschedulePage,
    children: [
      {
        path: ':meetingId/type',
        component: StudentSelectRescheduleTypeComponent,
        data: {
          title: 'Tipo de Selección'
        }
      },
      {
        path: ':meetingId/tutor-select',
        component: StudentSelectRescheduleTutorComponent,
        data: {
          title: 'Seleccionar Tutor'
        }
      },
      {
        path: ':meetingId/summary/:tutorId',
        component: StudentRescheduleSummaryComponent,
        data: {
          title: 'Resumen'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
      StudentReschedulePage,
      StudentSelectRescheduleTutorComponent,
      StudentSelectRescheduleTypeComponent,
      StudentRescheduleSummaryComponent
  ]
})
export class StudentReschedulePageModule {}

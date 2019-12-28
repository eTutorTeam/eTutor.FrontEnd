import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentReschedulePage } from './student-reschedule.page';
import {ComponentsModule} from "../../components/components.module";
import {StudentSelectRescheduleTutorComponent} from "./student-select-reschedule-tutor/student-select-reschedule-tutor.component";
import {StudentTutorsListComponent} from "../student-tutors-list/student-tutors-list.component";

const routes: Routes = [
  {
    path: '',
    component: StudentReschedulePage,
    children: [
      {
        path: ':meetingId/tutor-select',
        component: StudentSelectRescheduleTutorComponent,
        data: {
          title: 'Seleccionar Tutor'
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
      StudentTutorsListComponent
  ]
})
export class StudentReschedulePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentSchedulePage } from './student-schedule.page';
import {ComponentsModule} from "../../components/components.module";
import {StudentSubjectSelectorComponent} from "./student-subject-selector/student-subject-selector.component";
import {StudentDatetimeSelectorPage} from "./student-datetime-selector/student-datetime-selector.page";

const routes: Routes = [
  {
    path: '',
    component: StudentSchedulePage
  },
  {
    path: 'datetime/:subjectId',
    component: StudentDatetimeSelectorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [
    StudentSchedulePage,
    StudentSubjectSelectorComponent,
    StudentDatetimeSelectorPage
  ]
})
export class StudentSchedulePageModule {}

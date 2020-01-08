import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentPage } from './student.page';

const routes: Routes = [
  {
    path: '',
    component: StudentPage,
    children: [
      {
        path: 'schedule',
        loadChildren: './student-schedule/student-schedule.module#StudentSchedulePageModule'
      },
      {
        path: 'reschedule',
        loadChildren: './student-reschedule/student-reschedule.module#StudentReschedulePageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentPage]
})
export class StudentPageModule {}

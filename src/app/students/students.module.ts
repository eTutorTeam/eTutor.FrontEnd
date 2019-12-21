import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

const routes: Routes = [
  {
    path: 'schedule',
    loadChildren: () => import('./student-schedule/student-schedule.module').then(m => m.StudentSchedulePageModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentsModule { }

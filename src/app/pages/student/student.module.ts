import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentScheduleComponent} from "./student-schedule/student-schedule.component";
import {ComponentsModule} from "../../components/components.module";
import {Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";


const routes: Routes = [
  {
    path: 'schedule',
    component: StudentScheduleComponent
  }  ,
  {
    path: '',
    redirectTo: 'schedule',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [StudentScheduleComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule
  ]
})
export class StudentModule { }

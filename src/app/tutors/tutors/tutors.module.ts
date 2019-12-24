import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TutorsPage } from './tutors.page';
import {ComponentsModule} from "../../components/components.module";
import {TutorHomeComponent} from "./tutor-home/tutor-home.component";
import {TutorAcceptMeetingComponent} from "./tutor-accept-meeting/tutor-accept-meeting.component";
import {TutorMeetingDetailComponent} from "./tutor-meeting-detail/tutor-meeting-detail.component";

const routes: Routes = [
  {
    path: '',
    component: TutorsPage,
    children: [
      {
        path: '',
        component: TutorAcceptMeetingComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  entryComponents: [
    TutorMeetingDetailComponent
  ],
  declarations: [
    TutorsPage,
    TutorHomeComponent,
    TutorAcceptMeetingComponent,
    TutorMeetingDetailComponent
  ]
})
export class TutorsPageModule {}

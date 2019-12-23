import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TutorMeetingPage } from './tutor-meeting.page';
import {ComponentsModule} from "../../components/components.module";
import {TutorAcceptMeetingComponent} from "./tutor-accept-meeting/tutor-accept-meeting.component";

const routes: Routes = [
  {
    path: '',
    component: TutorMeetingPage,
    children: [
      {
        path: 'accept/:meetingId',
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
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
      TutorMeetingPage,
      TutorAcceptMeetingComponent
  ]
})
export class TutorMeetingPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TutorAcceptMeetingPage } from './tutor-accept-meeting.page';

const routes: Routes = [
  {
    path: '',
    component: TutorAcceptMeetingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TutorAcceptMeetingPage]
})
export class TutorAcceptMeetingPageModule {}

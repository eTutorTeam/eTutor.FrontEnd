import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ParentsPage } from './parents.page';
import {ComponentsModule} from "../components/components.module";
import {ParentPendingMeetingsComponent} from "./parent-pending-meetings/parent-pending-meetings.component";
import {ParentsHomeComponent} from "./parents-home/parents-home.component";
import {AvatarModule} from "ngx-avatar";

const routes: Routes = [
  {
    path: '',
    component: ParentsPage,
    children: [
      {
        path: '',
        component: ParentsHomeComponent
      },
      {
        path: 'pending',
        component: ParentPendingMeetingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ParentsPage,
    ParentPendingMeetingsComponent,
    ParentsHomeComponent
  ]
})
export class ParentsPageModule {}

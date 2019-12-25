import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ParentsPage } from './parents.page';
import {ComponentsModule} from "../components/components.module";
import {ParentPendingMeetingsComponent} from "./parent-pending-meetings/parent-pending-meetings.component";

const routes: Routes = [
  {
    path: '',
    component: ParentsPage,
    children: []
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
      ParentsPage,
      ParentPendingMeetingsComponent
  ]
})
export class ParentsPageModule {}

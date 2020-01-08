import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TutorsPage } from './tutors.page';
import {ComponentsModule} from "../../components/components.module";
import {TutorHomeComponent} from "./tutor-home/tutor-home.component";

const routes: Routes = [
  {
    path: '',
    component: TutorsPage,
    children: [
      {
        path: '',
        component: TutorHomeComponent
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
  declarations: [
    TutorsPage,
    TutorHomeComponent
  ]
})
export class TutorsPageModule {}

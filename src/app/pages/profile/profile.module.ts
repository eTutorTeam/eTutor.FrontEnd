import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { StarsRatingModalPageModule } from '../stars-rating-modal/stars-rating-modal.module';
import { StarsRatingModalPage } from '../stars-rating-modal/stars-rating-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  entryComponents: [
    StarsRatingModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    StarsRatingModalPageModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}

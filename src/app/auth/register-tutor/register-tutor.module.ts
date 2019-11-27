import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterTutorPage } from './register-tutor.page';
import { RegisterModalPageModule } from 'src/app/pages/register-modal/register-modal.module';

const routes: Routes = [
  {
    path: '',
    component: RegisterTutorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterModalPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterTutorPage]
})
export class RegisterTutorPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterTutorPage } from './register-tutor.page';
import { RegisterModalPageModule } from 'src/app/pages/register-modal/register-modal.module';
import { RegisterModalPage } from 'src/app/pages/register-modal/register-modal.page';
import {ComponentsModule} from '../../components/components.module';
import {NgxMaskModule} from "ngx-mask";

const routes: Routes = [
  {
    path: '',
    component: RegisterTutorPage
  }
];

@NgModule({
  entryComponents: [
    RegisterModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterModalPageModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NgxMaskModule
  ],
  declarations: [RegisterTutorPage]
})
export class RegisterTutorPageModule {}

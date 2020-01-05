import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ComponentsModule } from '../../components/components.module';
import {NgCalendarModule} from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeZh from '@angular/common/locales/es-DO';
registerLocaleData(localeZh);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-DO' }
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

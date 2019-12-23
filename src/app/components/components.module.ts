import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserPopoverComponent } from './user-popover/user-popover.component';
import {EtutorLogoComponent} from './etutor-logo/etutor-logo.component';
import {ScheduledMeetingsComponent} from "./scheduled-meetings/scheduled-meetings.component";
import {NgCalendarModule} from "ionic2-calendar";
import {SimpleHeaderComponent} from "./simple-header/simple-header.component";


const components = [
  MenuComponent,
  HeaderComponent,
  UserPopoverComponent,
  EtutorLogoComponent,
  ScheduledMeetingsComponent,
    SimpleHeaderComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
      NgCalendarModule
  ]
})
export class ComponentsModule { }

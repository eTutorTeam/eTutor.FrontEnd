import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserPopoverComponent } from './user-popover/user-popover.component';
import {EtutorLogoComponent} from './etutor-logo/etutor-logo.component';



@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    UserPopoverComponent,
    EtutorLogoComponent
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    UserPopoverComponent,
    EtutorLogoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }

import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserPopoverComponent } from '../user-popover/user-popover.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor( private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  async mostrarPop( event ) {
    const popover = await this.popoverCtrl.create({
      component: UserPopoverComponent,
      event,
      mode: 'ios',
    });

    await popover.present();
  }
}

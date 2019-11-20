import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { UserPopoverComponent } from '../components/user-popover/user-popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private authService: AuthenticationService,
    public router: Router,
    private popoverCtrl: PopoverController
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['login-tutor']);
  }
  async mostrarPop( event ) {
    const popover = await this.popoverCtrl.create({
      component: UserPopoverComponent,
      event,
      mode: 'ios',
    });

    await popover.present();
  }

}

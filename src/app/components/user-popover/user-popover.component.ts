import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, LoadingController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AccountService } from 'src/app/services/accounts/account.service';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss'],
})
export class UserPopoverComponent implements OnInit {

  items: {text: string, action: string}[] = [
    {
      text: 'Ver perfil',
      action: 'profile'
    },
    {
      text: 'Cerrar Sesión',
      action: 'logout'
    }
  ];

  loading: HTMLIonLoadingElement;

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accountService: AccountService) { }

  ngOnInit() {
    this.startLoading('', false);
  }

  async onClick(action: string) {
    this.popoverController.dismiss();
    if (action === 'profile') {
      this.router.navigate(['profile']);
    } else if (action === 'logout') {
      this.logout();
    }
  }
  logout() {
    this.startLoading();
    this.accountService.logoutUser()
    .then(res => {
      this.loading.dismiss();
    })
    .catch(err => {
        this.showAlert('Error', 'Hubo error tratando de hacer el logout');
        this.loading.dismiss();
        console.log(err);
    });
  }

  private async startLoading(msg: string = 'Loading', present: boolean = true) {
    this.loading = await this.loadingCtrl.create({
      spinner: 'lines',
      message: msg
    });

    if (present)
      this.loading.present();
  }

  private async showAlert(title: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg
    });
    alert.present();
  }

}

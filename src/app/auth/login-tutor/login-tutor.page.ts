import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/models/login-request';
import { AccountService } from 'src/app/services/accounts/account.service';
import { UserTokenResponse } from 'src/app/models/user-token-response';
import { LoadingOptions } from '@ionic/core';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import {ToastNotificationService} from "../../services/toast-notification.service";
import {FcmService} from "../../services/notifications/fcm.service";
import {PushNotificationService} from "../../services/notifications/push-notification.service";


// ^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$ <- Email Validator
@Component({
  selector: 'app-login-tutor',
  templateUrl: './login-tutor.page.html',
  styleUrls: ['./login-tutor.page.scss'],
})
export class LoginTutorPage implements OnInit {

  // @ViewChild('passwordEyeRegister', {read: true, static: true}) passwordEye;
  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';
  userForm: FormGroup;
  user: UserTokenResponse;
  loading: HTMLIonLoadingElement;
  constructor(
      private router: Router,
      private menuCtrl: MenuController,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private accountService: AccountService,
      private toastNotificationService: ToastNotificationService,
      private fb: FormBuilder,
      private fcmService: FcmService,
      private notificationService: PushNotificationService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.checkIfUserIsLoggedIn();
  }

  submitForm() {
    this.logInUser().catch((err) => {
      console.log(err, 'ERROR VAR');
      this.toastNotificationService.presentErrorToast(err);
      this.loading.dismiss();
    });
  }

  get email() { return this.userForm.get('email'); }

  get password() { return this.userForm.get('password'); }

  buildForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  private async logInUser() {
    if (this.userForm.invalid) {
      return;
    }
    await this.createLoading('Lo estamos ingresando al sistema');

    const request: LoginRequest = this.userForm.value;
    this.user = await this.accountService.loginUser(request);
    this.userForm.reset();
    this.goHome();
    this.loading.dismiss();

    this.fcmService.getToken()
        .then(() => {this.notificationService.listenWhenUserTapsNotification(); })
        .catch(err => this.toastNotificationService.presentErrorToast(err));
  }

  private async checkIfUserIsLoggedIn() {
    const logged = await this.accountService.isUserLoggedIn();
    this.accountService.reloadUserInfo().then(async (res) => {
      if (logged) {
        await this.goHome();
        this.fcmService.getToken()
            .then(() => {this.notificationService.listenWhenUserTapsNotification(); })
            .catch(err => this.toastNotificationService.presentErrorToast(err));
      }
    }).catch(async (err) => {
      await this.accountService.logoutUser();
    });
  }

  private async createLoading(msg: string = '', spin: LoadingOptions['spinner'] = 'lines') {
    this.loading = await this.loadingCtrl.create({
      message: msg,
      spinner: spin
    });
    this.loading.present();
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      subHeader,
      message,
      buttons: [
        {
          text: 'Ok',
          handler: (blah) => {
            console.log('Botón OK');
          }
        }
      ]
    });

    await alert.present();
  }

  private async goHome() {
    await this.router.navigate(['home']);
    await this.menuCtrl.enable(true);
  }

  forgotPassword() {
    this.router.navigate(['forgot-password']);
  }
  register() {
    this.router.navigate(['register-tutor']);
  }

  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
  }

}

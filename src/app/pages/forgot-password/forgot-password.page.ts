import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ETutorValidator} from '../../validators/e-tutor-validator';
import {Router} from '@angular/router';
import {RegisterRequest} from '../../models/register-request';
import {LoadingOptions} from '@ionic/core';
import {AlertController, LoadingController} from '@ionic/angular';
import {AccountService} from '../../services/accounts/account.service';
import {ForgotPasswordRequest} from '../../models/forgot-password-request';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  pwdForm: FormGroup;
  loading: any;

  constructor(private fb: FormBuilder,
              public router: Router,
              private loadingCtrl: LoadingController,
              private accountService: AccountService,
              private alertCtrl: AlertController,
              ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    console.log('Building form')
    this.pwdForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
    });
  }

  get email() { return this.pwdForm.get('email'); }

  goToLogin() {
    this.router.navigate(['login-tutor']);
  }

  submitForm() {
    this.sendForgotPwdEmail()
        .then( resp => {
          this.presentAlert('Exito!','','Revise su bandeja de entrada' +
              'para continuar con el proceso');
        })
        .catch((err) => {
      console.log(err, 'ERROR VAR');
      this.presentAlert(err.error.reasonPhrase, '', err.error.message);
      this.loading.dismiss();
    });
  }
  private async sendForgotPwdEmail() {
    if (this.pwdForm.invalid) {
      return;
    }
    await this.createLoading('Enviando correo de recuperación.');
    const request: ForgotPasswordRequest = this.pwdForm.value;
    const response = await this.accountService.ForgotPassword(request);
    this.pwdForm.reset();
    this.goToLogin();
    this.loading.dismiss();
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



}

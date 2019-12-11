import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/models/login-request';
import { AccountService } from 'src/app/services/accounts/account.service';
import { UserTokenResponse } from 'src/app/models/user-token-response';
import { LoadingOptions } from '@ionic/core';
import { MenuComponent } from 'src/app/components/menu/menu.component';


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
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  submitForm() {
    this.logInUser().catch((err) => {
      console.log(err, 'ERROR VAR');
      this.presentAlert(err.error.reasonPhrase, '', err.error.message);
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

  goHome() {
    this.router.navigate(['home']);
    this.menuCtrl.enable(true);
  }

  forgotPassword() {
    this.router.navigate(['forgot-password']);
  }
  register() {
    // this.presentAlert('Not Implemented', '', 'This feature isn\'t available yet!');
    this.router.navigate(['register-tutor']);
  }

  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
  }

}

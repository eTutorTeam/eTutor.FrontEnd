import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/models/login-request';
import { AccountService } from 'src/app/services/accounts/account.service';

@Component({
  selector: 'app-login-tutor',
  templateUrl: './login-tutor.page.html',
  styleUrls: ['./login-tutor.page.scss'],
})
export class LoginTutorPage implements OnInit {

  @ViewChild('passwordEyeRegister', {read: true, static: true}) passwordEye;
  // Seleccionamos el elemento con el nombre que le pusimos con el #
  passwordTypeInput  =  'password';
  // Variable para cambiar dinamicamente el tipo de Input que por defecto sera 'password'
  iconpassword  =  'eye-off';
  // Variable para cambiar dinamicamente el nombre del Icono que por defecto sera un ojo cerrado
  userForm: FormGroup;
  usuario = {
    email: '',
    password: ''
  };
  loading: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private authService: AuthenticationService,
    public router: Router,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private http: HttpClient, //TODO: Supone ser utilizado através de servicios unicamente
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  onSubmitTemplate() {
    if (this.userForm.valid) {
      console.log(this.usuario);
      this.login().catch(err => {
        this.alertCtrl.create({
          header: 'Error',
          message: 'No se pudo iniciar sesión', 
          buttons: ['OK']
        }).then(alert => {
          alert.present();
        });
      });
    }
  }

  async login() {
    const request:LoginRequest = this.userForm.value;
    let user = await this.authService.loginUser(request);
    console.log('RESPONSE SERVICE', user);
  }

  async loginOld() {
    await this.presentLoading('Espere');
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return this.http.post<{token: string, roles: Array<number>, username: string, email: string}>
    (
      'https://etutorapi.azurewebsites.net/api/accounts/login',
      { email: this.usuario.email, password: this.usuario.password},
      {headers}
    ).subscribe(
      res => {
        this.authService.login(res.token);
        this.usuario = {
          email: '',
          password: ''
        };
        this.goHome();
        this.loading.dismiss();
        return true;
      },
      err => {
        this.loading.dismiss();
        this.presentAlert('Error', 'Error de autenticación', 'Usuario y/o contraseña incorrectos.');
      }
    );

    // this.loading.dismiss();
  }


  async presentLoading( message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
      // duration: 2000
    });
    return this.loading.present();
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
    this.presentAlert('Not Implemented', '', 'This feature isn\'t available yet!');
  }
  register() {
    this.presentAlert('Not Implemented', '', 'This feature isn\'t available yet!');
  }

  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
  }

  private buildForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-tutor',
  templateUrl: './login-tutor.page.html',
  styleUrls: ['./login-tutor.page.scss'],
})
export class LoginTutorPage implements OnInit {

  usuario = {
    email: '',
    password: ''
  };

  loading: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    public router: Router,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  onSubmitTemplate() {
    console.log(this.usuario);
    this.login();
  }


  async login() {
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


}

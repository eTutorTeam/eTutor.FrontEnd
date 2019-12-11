import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {AccountService} from '../../services/accounts/account.service';
import {Observable} from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.page.html',
  styleUrls: ['./student-manager.page.scss'],
})
export class StudentManagerPage implements OnInit {

  studentList: Observable<UserResponse[]>;
  loading: HTMLIonLoadingElement;

  constructor(private dataService: DataService,
              private accountService: AccountService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    const userId = this.accountService.user.uId;
    this.studentList = this.dataService.getChildren(userId);
  }

  async toggleStudentState(event, studentId) {
    const newState: boolean = event.detail.checked;
    await this.createLoading('Enviando su petición.');
    this.dataService.toogleUser(studentId).toPromise().then(
      success => {
        this.loading.dismiss();
        this.presentAlert('Exito!', '', 'El estudiante ha sido cambiado de estado satisfactoriamente.');
      }
    );
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

import { Injectable } from '@angular/core';
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  alert: HTMLIonAlertElement;

  constructor(
      private alertController: AlertController
  ) { }

  public async confirmationAlert(msg: string = '¿Seguro que desea hacer esto?', btnOk: string = 'Ok', btnCancel: string = 'Cancelar'): Promise<boolean> {
    let confirmed = false;
    this.alert = await this.alertController.create(
         {
           message: msg,
           buttons: [
             {
               text: btnCancel,
               role: 'cancel',
               cssClass: 'secondary'
             },
             {
               text: btnOk,
               handler: () => {
                 confirmed = true;
               }
             }
           ]
         }
     );

    await this.alert.present();
    await this.alert.onDidDismiss();
    return confirmed;
  }

  public async inputAlert(header: string = 'Ingrese el dato solicitado en el campo',
                          btnOk: string = 'Ok', btnCancel: string = 'Cancelar'): Promise<string> {
    let entered = '';
    this.alert = await this.alertController.create({
      header,
      inputs: [
        {
          name: 'input1',
          type: 'text',
          placeholder: 'Ingrese el dato en este campo'
        }
      ],
      buttons: [
        {
          text: btnCancel,
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: btnOk,
          handler: (alertData) => {
            entered = alertData.input1;
          }
        }
      ]
    });

    await this.alert.present();
    await this.alert.onDidDismiss();
    return entered;

  }
}

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
}

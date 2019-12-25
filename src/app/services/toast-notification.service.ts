import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

  constructor(
      private toastController: ToastController
  ) { }

  async presentToast(title: string, message: string) {
    const toast = await this.toastController.create({
      showCloseButton: true,
      message,
      header: title,
      duration: 6000,
      position: "top"
    });
    toast.present();
  }

  async presentErrorToast(err: any) {
    let message;
    if (err.error !== undefined && err.error.message !== undefined) {
      message = err.error.message;
    } else {
      message = JSON.stringify(err);
    }

    await this.presentToast('Error', message);
  }
}

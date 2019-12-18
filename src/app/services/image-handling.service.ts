import { Injectable } from '@angular/core';
import {ActionSheetController} from "@ionic/angular";
import {LoadingService} from "./loading.service";
import {ToastNotificationService} from "./toast-notification.service";

@Injectable({
  providedIn: 'root'
})
export class ImageHandlingService {

  constructor(
      private actionSheetController: ActionSheetController,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService
  ) { }


  selectImage() {
    this.openSelectPicker().then(res => {

    }).catch(err => {
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  private async openSelectPicker() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una Imagen',
      buttons: [{
        text: 'Cámara',
        role: 'selected',
        icon: 'camera',
        handler: () => {
          this.functionCaller(this.openCamera);
        }
      },
        {
          text: 'Librería',
          role: 'selected',
          icon: 'albums',
          handler: () => {
            this.functionCaller(this.imagePicker);
          }
        }
      ]
    });

    await actionSheet.present();
  }


  private functionCaller(func: () => Promise<void>) {
    func().then(res => {
      //this.loadingService.stopLoading();
    }).catch(err => {
      //this.loadingService.stopLoading();
      this.toastNotificationService.presentToast('Error', 'Ha ocurrido un error al ejecutar esta acción');
    });
  }

  private async openCamera() {

  }

  private async imagePicker() {

  }
}

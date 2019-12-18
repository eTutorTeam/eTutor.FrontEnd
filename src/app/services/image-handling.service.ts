import {Injectable} from '@angular/core';
import {ActionSheetController} from "@ionic/angular";
import {LoadingService} from "./loading.service";
import {ToastNotificationService} from "./toast-notification.service";
import {
  Camera,
  CameraOptions,
  DestinationType,
  EncodingType,
  MediaType,
  PictureSourceType
} from "@ionic-native/camera/ngx";

@Injectable({
  providedIn: 'root'
})
export class ImageHandlingService {

  constructor(
      private actionSheetController: ActionSheetController,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService,
      private camera: Camera
  ) { }


  selectImage(): Promise<string> {
    return new Promise(((resolve, reject) => {
      this.openSelectPicker().then((res: any) => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    }));
  }

  private async openSelectPicker(): Promise<string> {
    let sourceType: PictureSourceType = PictureSourceType.CAMERA;
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una Imagen',
      buttons: [{
        text: 'Cámara',
        role: 'selected',
        icon: 'camera',
        handler: () => {
          sourceType = this.camera.PictureSourceType.CAMERA;
        }
      },
        {
          text: 'Librería',
          role: 'selected',
          icon: 'albums',
          handler: () => {
            sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
          }
        }
      ]
    });

    await actionSheet.present();
    await actionSheet.onDidDismiss();

    const image = await this.getPicture(sourceType);
    return image;

  }

  private async getPicture(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: DestinationType.DATA_URL,
      encodingType: EncodingType.JPEG,
      mediaType: MediaType.PICTURE,
      sourceType
    };

    return await this.camera.getPicture(options);
  }
}

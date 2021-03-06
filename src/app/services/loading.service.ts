import { Injectable } from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loader: HTMLIonLoadingElement;

  constructor(
      private loadingController: LoadingController
  ) { }

  async startLoading(msg: string = 'Cargando') {
    this.stopLoading();
    this.loader = await this.loadingController.create({
      message: msg,
    });
    this.loader.present();
  }

  stopLoading() {
    if (this.loader !== undefined) {
      this.loader.dismiss();
    }
  }
}

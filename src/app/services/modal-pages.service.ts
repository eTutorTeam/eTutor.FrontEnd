import { Injectable } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ModalPagesService {

  currentModal: HTMLIonModalElement;

  constructor(private modalController: ModalController) { }

  async openModal(component: any, props: any = null) {
    const modal = await this.modalController.create({component, componentProps: props});
    this.currentModal = modal;
    await modal.present();
    await modal.onDidDismiss();
  }

  closeModal() {
    this.currentModal.dismiss();
  }
}

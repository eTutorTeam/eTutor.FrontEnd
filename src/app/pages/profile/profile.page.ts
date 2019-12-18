import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/accounts/account.service";
import {UserService} from "../../services/accounts/user.service";
import {UserProfileResponse} from "../../models/user-profile-response";
import {LoadingController} from "@ionic/angular";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {ImageHandlingService} from "../../services/image-handling.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: UserProfileResponse;
  pageTitle = 'Perfil de usuario';
  loading: HTMLIonLoadingElement;
  ratingSummary = 3.5;

  constructor(
      private accountService: AccountService,
      private userService: UserService,
      private loadingController: LoadingController,
      private toastNotificationService: ToastNotificationService,
      private imageHandlingService: ImageHandlingService
  ) { }

  ngOnInit() {
    this.getData().catch(async (err) => {
      await this.stopLoading();
      await this.toastNotificationService.presentErrorToast(err);
    });
  }

  get stars(): string[] {
    const arr: string[] = [];
    let rat = this.ratingSummary;
    for (let i = 1; i <= 5; i++) {
      if (rat === 0.5) {
        rat--;
        arr.push('star-half');
        continue;
      }

      if (rat <= 0) {
        arr.push('star-outline');
        continue;
      }

      arr.push('star');
      rat--;
    }
    return arr;
  }

  openImageSelector() {
    this.imageHandlingService.selectImage();
  }

  private async getData() {
    await this.startLoading();
    this.profile = await this.userService.getUserProfile();
    await this.stopLoading();
  }

  private async startLoading() {
    this.loading = await this.loadingController.create({
      backdropDismiss: false,
      animated: true,
      message: 'Cargando'
    });
    this.loading.present();
  }

  private async stopLoading() {
    await this.loading.dismiss();
  }

}

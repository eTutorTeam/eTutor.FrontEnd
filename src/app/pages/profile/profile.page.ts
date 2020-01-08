import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/accounts/account.service";
import {UserService} from "../../services/accounts/user.service";
import {UserProfileResponse} from "../../models/user-profile-response";
import {LoadingController, ModalController} from "@ionic/angular";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {ImageHandlingService} from "../../services/image-handling.service";
import {RoleTypes} from "../../enums/role-types.enum";
import {UserProfileUpdateRequest} from "../../models/user-profile-update-request";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: UserProfileResponse;
  pageTitle = 'Perfil de usuario';
  loading: HTMLIonLoadingElement;
  ratingSummary = 0;
  formAboutMeField = '';
  formphoneNumber = '';

  constructor(
      private accountService: AccountService,
      private userService: UserService,
      private loadingController: LoadingController,
      private toastNotificationService: ToastNotificationService,
      private imageHandlingService: ImageHandlingService,
      private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.getData().catch(async (err) => {
      await this.stopLoading();
      await this.toastNotificationService.presentErrorToast(err);
    });
  }

  get validated(): boolean {
    if (this.profile !== undefined) {
      return this.profile.aboutMe !== this.formAboutMeField || this.profile.phoneNumber !== this.formphoneNumber;
    }
    return false;
  }

  saveUserBtn() {
    this.updateUserProfile().catch(err => {
      this.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  openImageSelector() {
    this.getImage().catch(err => {
      this.toastNotificationService.presentErrorToast(err);
      this.stopLoading();
    });
  }

  private async getImage() {
    const img = await this.imageHandlingService.selectImage();
    const imgName = "profileImage.jpg";

    this.startLoading('Cargando foto al servidor');
    await this.userService.addImageToUser(img, imgName);
    this.stopLoading();
    await this.getData();
    this.startLoading('Adaptando imagen para el usuario');
    await this.accountService.updateUserImage(this.profile.profileImageUrl);
    this.stopLoading();
  }

  private async getData() {
    await this.startLoading('Cargando datos');
    this.profile = await this.userService.getUserProfile();
    this.ratingSummary = this.profile.ratings;
    this.updateAboutField();
    this.updatePhoneField();
    await this.updatePageTitle();
    await this.stopLoading();
  }

  private updateAboutField() {
    if (this.formAboutMeField === '') {
      this.formAboutMeField = this.profile.aboutMe;
    }
  }
  private updatePhoneField(){
    if(this.formphoneNumber === ''){
      this.formphoneNumber = this.profile.phoneNumber;
    }
  }

  private async updateUserProfile() {
    this.startLoading('Guardando datos');
    const curUser: UserProfileUpdateRequest = this.profile;
    if (!this.validated) {
      await this.stopLoading();
      return;
    }
    curUser.aboutMe = this.formAboutMeField;
    curUser.phoneNumber = this.formphoneNumber;
    await this.userService.updateUser(curUser);
    this.profile.aboutMe = this.formAboutMeField;
    this.profile.phoneNumber = this.formphoneNumber;
    await this.stopLoading();
  }

  private async updatePageTitle() {
    let title = 'Perfil del Usuario';
    if (await this.accountService.checkIfUserHasRole(RoleTypes.Student)) {
      title = 'Perfil de Estudiante';
    } else if (await this.accountService.checkIfUserHasRole(RoleTypes.Tutor)) {
      title = 'Perfil de Tutor';
    } else if (await this.accountService.checkIfUserHasRole(RoleTypes.Parent)) {
      title = 'Perfil de Padre';
    }
    this.pageTitle = title;
  }

  private async startLoading(msg: string = 'Cargando') {
    this.loading = await this.loadingController.create({
      backdropDismiss: false,
      animated: true,
      message: msg
    });
    await this.loading.present();
  }

  private async stopLoading() {
    await this.loading.dismiss();
  }

}

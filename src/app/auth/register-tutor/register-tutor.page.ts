import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
} from "@angular/forms";
import {
  AlertController,
  LoadingController,
  MenuController,
  ModalController,
} from "@ionic/angular";
import { RegisterModalPage } from "src/app/pages/register-modal/register-modal.page";
import { Router } from "@angular/router";
import { AccountService } from "../../services/accounts/account.service";
import { LoadingOptions } from "@ionic/core";
import { RegisterRequest } from "../../models/register-request";
import { ToastNotificationService } from "../../services/toast-notification.service";

@Component({
  selector: "app-register-tutor",
  templateUrl: "./register-tutor.page.html",
  styleUrls: ["./register-tutor.page.scss"],
})
export class RegisterTutorPage implements OnInit {
  passwordTypeInput = "password";
  iconpassword = "eye-off";
  correoPadreVisible = false;
  userForm: FormGroup;
  loading: HTMLIonLoadingElement;
  userType: string = "tutor";
  modalOpened = false;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastNotificationService: ToastNotificationService,
    public router: Router,
    private accountService: AccountService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.buildForm();
    this.updateFormType(this.userType);
  }

  goToLogin() {
    this.router.navigate(["login-tutor"]);
  }

  buildForm() {
    this.userForm = this.fb.group({
      personalId: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      parentEmail: ['', [Validators.required, Validators.email]],
      name: ['' , Validators.required],
      lastname: ['' , Validators.required],
      password: ['' , Validators.required],
      comfirmpassword: ['' , Validators.required],
      gender: ['' , Validators.required],
      birthDate: ['' , Validators.required]
    });
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      subHeader,
      message,
      buttons: [
        {
          text: "Ok",
          handler: (blah) => {
            console.log("Botón OK");
          },
        },
      ],
    });

    await alert.present();
  }

  submitForm() {
    this.registerUser().catch((err) => {
      console.log(err, "ERROR VAR");
      this.presentAlert(err.error.reasonPhrase, "", err.error.message);
      this.loading.dismiss();
    });
  }

  private async registerUser() {
    console.log('FORM', this.userForm);
    if (this.userForm.invalid) {
      return;
    }
    if (!this.checkIfPasswordsMatch()) {
      return;
    }
    await this.createLoading("Estamos creando su usuario");
    const request: RegisterRequest = this.userForm.value;
    await this.accountService.registerUser(request, this.userType);
    await this.toastNotificationService.presentToast(
      "Cuenta Creada",
      "Le hemos enviado un correo electrónico con los detalles de su cuenta"
    );
    this.userForm.reset();
    this.goToLogin();
    this.loading.dismiss();
  }
  
  private async createLoading(
    msg: string = "",
    spin: LoadingOptions["spinner"] = "lines"
  ) {
    this.loading = await this.loadingCtrl.create({
      message: msg,
      spinner: spin,
    });
    this.loading.present();
  }

  updateFormType(type: string): void {
    this.userType = type;
    this.updateFormForUserType();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: RegisterModalPage,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    this.userType = data.userType;

    this.updateFormForUserType();
  }

  private updateFormForUserType() {
    switch (this.userType) {
      case "student":
        this.correoPadreVisible = true;
        this.personalId.disable();
        break;
      case "parent":
        this.parentEmail.disable();
        break;
      case "tutor":
        this.correoPadreVisible = false;
        this.parentEmail.disable();
        this.personalId.enable();
        break;
    }
  }

  private checkIfPasswordsMatch(): Boolean {
    const password = this.userForm.get("password").value;
    const confirmPassword = this.userForm.get("comfirmpassword").value;
    const equal = password === confirmPassword;
    if (!equal) {
      this.presentAlert(
        "Contraseñas no coinciden",
        "",
        "Las contraseñas suministradas no coinciden"
      );
    }
    return equal;
  }

  get personalId() {
    return this.userForm.get("personalId");
  }
  get email() {
    return this.userForm.get("email");
  }
  get parentEmail() {
    return this.userForm.get("parentEmail");
  }
  get name() {
    return this.userForm.get("name");
  }
  get lastname() {
    return this.userForm.get("lastname");
  }
  get password() {
    return this.userForm.get("password");
  }
  get comfirmpassword() {
    return this.userForm.get("comfirmpassword");
  }
  get gender() {
    return this.userForm.get("gender");
  }
  get birthDate() {
    return this.userForm.get("birthDate");
  }

  togglePasswordMode() {
    this.passwordTypeInput =
      this.passwordTypeInput === "text" ? "password" : "text";
    this.iconpassword = this.iconpassword === "eye-off" ? "eye" : "eye-off";
  }
}

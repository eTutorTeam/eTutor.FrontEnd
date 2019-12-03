import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup,  FormControl } from '@angular/forms';
import { ETutorValidator } from 'src/app/validators/e-tutor-validator';
import { ModalController } from '@ionic/angular';
import { RegisterModalPage } from 'src/app/pages/register-modal/register-modal.page';

@Component({
  selector: 'app-register-tutor',
  templateUrl: './register-tutor.page.html',
  styleUrls: ['./register-tutor.page.scss'],
})
export class RegisterTutorPage implements OnInit {

  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';
  correoPadreVisible = false;
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.openModal();
    this.buildForm();
    console.log('ecetera');
  }
  buildForm() {
    this.userForm = this.fb.group({
      cedula: new FormControl('', [
        Validators.required,
        ETutorValidator.cedulaLengthValidator(new RegExp('([\\d+]{3}(|-)[\\d+]{7}(|-)[\\d]{1})'))
      ]),
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      emailPadre: ['', [
        Validators.required,
        Validators.email
      ]],
      name: ['', [
        Validators.required
      ]],
      lastname: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      confimrpassword: ['', [
        Validators.required
      ]]
    });
  }

  submitForm() {
    return;
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: RegisterModalPage
    });

    await modal.present();


    const { data } = await modal.onDidDismiss();

    switch (data.userType) {
      case 'Estudiante':
        this.correoPadreVisible = true;
        this.cedula.disable();
        break;
      case 'Padre':
        this.emailPadre.disable();
        break;
    }
  }

  get cedula() { return this.userForm.get('cedula'); }
  get email() { return this.userForm.get('email'); }
  get emailPadre() { return this.userForm.get('emailPadre'); }
  get name() { return this.userForm.get('name'); }
  get lastname() { return this.userForm.get('lastname'); }
  get password() { return this.userForm.get('password'); }
  get confimrpassword() { return this.userForm.get('confimrpassword'); }

  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
  }
}

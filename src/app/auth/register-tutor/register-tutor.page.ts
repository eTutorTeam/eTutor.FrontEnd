import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { ETutorValidator } from 'src/app/validators/e-tutor-validator';

@Component({
  selector: 'app-register-tutor',
  templateUrl: './register-tutor.page.html',
  styleUrls: ['./register-tutor.page.scss'],
})
export class RegisterTutorPage implements OnInit {

  userForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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
      ]]
    });
  }

  submitForm() {
    return;
  }

  get cedula() { return this.userForm.get('cedula'); }
  get email() { return this.userForm.get('email'); }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ETutorValidator} from '../../validators/e-tutor-validator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder,public router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
    });
  }
  goToLogin() {
    this.router.navigate(['login-tutor']);
  }
  get email() { return this.userForm.get('email'); }

}

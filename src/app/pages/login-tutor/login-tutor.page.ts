import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-tutor',
  templateUrl: './login-tutor.page.html',
  styleUrls: ['./login-tutor.page.scss'],
})
export class LoginTutorPage implements OnInit {

  usuario = {
    email: '',
    password: ''
  };
  constructor() { }

  ngOnInit() {
  }

  onSubmitTemplate() {
    console.log(this.usuario);
  }

}

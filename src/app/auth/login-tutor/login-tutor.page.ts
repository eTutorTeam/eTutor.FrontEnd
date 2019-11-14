import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitTemplate() {
    console.log(this.usuario);
    this.login();
  }


  login() {
    this.authService.login(this.usuario.email, this.usuario.password);
    this.usuario = {
      email: '',
      password: ''
    };
    this.goHome();
  }

  goHome() {
    this.router.navigate(['home']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss'],
})
export class UserPopoverComponent implements OnInit {

  items: {text: string, action: string}[] = [
    {
      text: 'Ver perfil',
      action: 'profile'
    },
    {
      text: 'Cerrar Sesión',
      action: 'logout'
    }
  ];


  constructor( private router: Router, private popoverController: PopoverController, private authService: AuthenticationService) { }

  ngOnInit() {}

  onClick(action: string) {
    this.popoverController.dismiss();
    if (action === 'profile') {
      this.router.navigate(['profile']);
    } else if (action === 'logout') {
      this.logout();
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login-tutor']);
  }

}

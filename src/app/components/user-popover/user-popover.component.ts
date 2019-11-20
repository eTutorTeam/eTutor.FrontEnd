import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

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


  constructor( private router: Router, private popoverController: PopoverController) { }

  ngOnInit() {}

  onClick(action: string) {
    this.popoverController.dismiss();
    if (action === 'profile') {
      this.router.navigate(['profile']);
    } else if (action === 'logout') {
      // logout
    }
  }

}

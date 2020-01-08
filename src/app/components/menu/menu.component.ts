import {Component, OnInit} from '@angular/core';
import {Componente} from 'src/app/models/componente';
import {AccountService} from '../../services/accounts/account.service';
import {UserTokenResponse} from '../../models/user-token-response';
import {Observable, from} from 'rxjs';
import {MenuDataService} from "../../services/menu-data.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user: UserTokenResponse;

  isLoggedIn: boolean;

  componentes: Componente[] ;

  constructor(private menuDataService: MenuDataService,
              private accountService: AccountService) {}

  async ngOnInit() {
    this.isLoggedIn = await this.accountService.isUserLoggedIn();
    this.refreshOptions();
  }

  async refreshOptions() {
    this.componentes = await this.menuDataService.getMenuOpts();
  }

}

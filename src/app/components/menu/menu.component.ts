import {Component, OnInit} from '@angular/core';
import {DataService} from 'src/app/services/data.service';
import {Componente} from 'src/app/models/componente';
import {AccountService} from '../../services/accounts/account.service';
import {UserTokenResponse} from '../../models/user-token-response';
import {RoleTypes} from '../../enums/role-types.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user: UserTokenResponse;

  isLoggedIn: boolean;

  componentes: Observable<Componente[]> ;

  constructor(private dataService: DataService,
              private accountService: AccountService) {}

  async ngOnInit() {
    this.isLoggedIn = await this.accountService.isUserLoggedIn();
    this.refreshOptions();
  }
  refreshOptions() {
    this.componentes = this.dataService.getMenuOpts();
  }

}

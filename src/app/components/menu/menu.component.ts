import {Component, OnInit} from '@angular/core';
import {DataService} from 'src/app/services/data.service';
import {Componente} from 'src/app/models/componente';
import {AccountService} from '../../services/accounts/account.service';
import {UserTokenResponse} from '../../models/user-token-response';
import {RoleTypes} from '../../enums/role-types.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user: UserTokenResponse;

  componentes: Componente[] = [];

  constructor(private dataService: DataService,
              private accountService: AccountService) { }

  ngOnInit() {
    this.dataService.getMenuOpts().toPromise().then( opts => {
      this.componentes.push(...opts);
    });
    this.accountService.getLoggedUser().then(
        resp => {
          const studentManager:Componente = {
            redirectTo: '/student-manager',
            icon: 'star',
            name: 'Mis estudiantes'
          }
          this.user = resp;
          if(this.user.roles.includes(RoleTypes.Parent)) {
            this.componentes.push(studentManager);
          }
        }
    );
  }

}

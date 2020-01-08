import {Injectable} from '@angular/core';
import {Componente} from "../models/componente";
import {RoleTypes} from "../enums/role-types.enum";
import {AccountService} from "./accounts/account.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  constructor(
      private accountService: AccountService,
      private http: HttpClient
  ) { }


  async getMenuOpts() {
    let options = await this.getSharedMenuOptions();
    const user = await this.accountService.isUserLoggedIn();
    if (user !== undefined || user !== null) {
      const isParent = await this.accountService.checkIfUserHasRole(RoleTypes.Parent);
      if (isParent) {
        const parentOptions = await this.getMenuOptsForParents();
        options = [...options, ...parentOptions];
      }

      const isStudent = await this.accountService.checkIfUserHasRole(RoleTypes.Student);
      if (isStudent) {
        const studentOptions = await this.getMenuOptsForStudents();
        options = [...options, ...studentOptions];
      }
    }

    return options;
  }


  private getSharedMenuOptions() {
    return this.http.get<Componente[]>('/assets/data/menu.json').toPromise();
  }

  private getMenuOptsForParents() {
    return this.http.get<Componente[]>('/assets/data/menuParents.json').toPromise();
  }

  private getMenuOptsForStudents() {
    return this.http.get<Componente[]>('/assets/data/menuStudents.json').toPromise();
  }
}

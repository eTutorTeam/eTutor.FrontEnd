import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componente } from '../models/componente';
import { environment } from 'src/environments/environment';
import { AccountService } from './accounts/account.service';
import { RoleTypes } from '../enums/role-types.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {



  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getMenuOpts() {
    const user = this.accountService.user;
    if (user === undefined || user === null)
      return this.http.get<Componente[]>('/assets/data/menu.json');
    const isParent = user.roles.includes(RoleTypes.Parent);
    if (isParent) {
      return this.getMenuOptsForParents()
    } else {
      return this.http.get<Componente[]>('/assets/data/menu.json');
    }
  }
  
  getMenuOptsForParents() {
    return this.http.get<Componente[]>('/assets/data/menuParents.json');
  }

  getHistoryData() {
    return this.http.get<any[]>('/assets/data/history.json');
  }

  getChildren(uId) {
    return this.http.get<UserResponse[]>(`${this.apiBaseUrl}/api/Parent/my-students`);
  }
  toogleUser(uId) {
    return this.http.post(`${this.apiBaseUrl}/api/Parent/toggle-student-state/${uId}/student`, {});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componente } from '../models/componente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiBaseUrl = environment.apiBaseUrl;
  
  constructor(private http: HttpClient) { }

  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  getHistoryData() {
    return this.http.get<any[]>('/assets/data/history.json');
  }

  getChildren(uId) {
    return this.http.get<UserResponse[]>(`${this.apiBaseUrl}/api/Parent/my-students`);
  }
  toogleUser(uId) {
    console.log('that');
    return this.http.post(`${this.apiBaseUrl}/api/Parent/toggle-student-state/${uId}/student`, {});
  }
}

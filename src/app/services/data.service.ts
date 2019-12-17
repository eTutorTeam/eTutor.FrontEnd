import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componente } from '../models/componente';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  getHistoryData() {
    return this.http.get<any[]>('/assets/data/history.json');
  }

  getChildren(uId) {
    //return this.http.get<UserResponse[]>(`https://localhost:5033/api/Parent/my-students?userId=${uId}`);
  }
  toogleUser(uId) {
    console.log('that');
    return this.http.post(`https://localhost:5033/api/Parent/toggle-student-state`, uId);
  }
  getsubjectslist(){
   return this.http.get<any[]>("https://localhost:5033/api/subjects/all-unrestricted");
    //return this.http.get<any[]>('/assets/data/subjects.json');
  }
  gettutorbysubjects(){
    return this.http.get<any[]>("https://localhost:5033/api/tutors/active");
    //return this.http.get<any[]>('/assets/data/tutors.json');
  }
}

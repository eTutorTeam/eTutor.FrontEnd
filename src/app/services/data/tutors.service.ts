import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserAdminResponse} from "../../models/user-admin-response";
import {TutorSimpleResponse} from "../../models/tutor-simple-response";

@Injectable({
  providedIn: 'root'
})

export class TutorsService {


  constructor(
      private http: HttpClient
  ) { }


  async getTutorsForSubject(subjectId: number): Promise<TutorSimpleResponse[]> {
    return this.http.get<TutorSimpleResponse[]>(`${environment.apiBaseUrl}/api/tutors/${subjectId}/subject`).toPromise();
  }

  async getTutorById(tutorId: number): Promise<TutorSimpleResponse> {
    return this.http.get<TutorSimpleResponse>(`${environment.apiBaseUrl}/api/tutors/${tutorId}`).toPromise();
  }
}

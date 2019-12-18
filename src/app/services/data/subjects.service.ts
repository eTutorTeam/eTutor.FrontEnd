import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SubjectResponse} from "../../models/subject-response";
import {SubjectSimpleResponse} from "../../models/subject-simple-response";

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(
      private http: HttpClient
  ) { }

  async getAllSubjects(): Promise<SubjectResponse[]> {
    return this.http.get<SubjectResponse[]>(`${environment.apiBaseUrl}/api/subjects/all`).toPromise();
  }

  async getSubjectById(subjectId: number): Promise<SubjectSimpleResponse> {
    return this.http.get<SubjectSimpleResponse>(`${environment.apiBaseUrl}/api/subjects/${subjectId}`).toPromise();
  }
}

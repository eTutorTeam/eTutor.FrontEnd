import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TutorSimpleResponse} from "../../models/tutor-simple-response";

@Injectable({
  providedIn: 'root'
})
export class StudentMeetingService {

  constructor(private http: HttpClient) { }

  async getNotSelectedTutorsInMeetingForStudent(meetingId: number) {
    return this.http
        .get<TutorSimpleResponse[]>(`${environment.apiBaseUrl}/api/student-meetings/${meetingId}/not-selected-tutors`).toPromise();
  }
}

import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MeetingStudentRequest} from "../../models/meeting-student-request";

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(
      private http: HttpClient
  ) { }

  async createMeeting(meeting: MeetingStudentRequest) {
    return this.http.post(`${environment.apiBaseUrl}/api/meetings`, meeting).toPromise();
  }

}

import { Injectable } from '@angular/core';
import {MeetingStatusEnum} from "../../enums/meeting-status.enum";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TutorMeetingService {

  constructor(
      private http: HttpClient
  ) { }

  async tutorSendMeetingResponse(meetingId: number, answeredStatus: MeetingStatusEnum) {
    return this.http.patch(`${environment.apiBaseUrl}/api/meetings/${meetingId}/tutor-answer`, {answeredStatus}).toPromise();
  }
}

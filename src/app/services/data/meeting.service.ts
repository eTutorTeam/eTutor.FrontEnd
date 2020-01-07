import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MeetingStudentRequest} from "../../models/meeting-student-request";
import {MeetingSummary} from "../../models/meeting-summary";
import {MeetingResponse} from "../../models/meeting-response";
import {MeetingStatusEnum} from "../../enums/meeting-status.enum";

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

  async getMeetingSummary(meetingId: number): Promise<MeetingSummary> {
    return this.http.get<MeetingSummary>(`${environment.apiBaseUrl}/api/meetings/${meetingId}/summary`).toPromise();
  }

  async getMeeting(meetingId: number): Promise<MeetingResponse> {
    return this.http.get<MeetingResponse>(`${environment.apiBaseUrl}/api/meetings/${meetingId}`).toPromise();
  }

  async tutorSendMeetingResponse(meetingId: number, answeredStatus: MeetingStatusEnum) {
    return this.http.patch(`${environment.apiBaseUrl}/api/meetings/${meetingId}/tutor-answer`, {answeredStatus}).toPromise();
  }
  async cancelMeeting(meetingId: number) {
    return this.http.put(`${environment.apiBaseUrl}/api/meetings/cancel-meeting/${meetingId}`,{}).toPromise();
  }
  
  async endMeeting(meetingId: number) {
    return this.http.patch(`${environment.apiBaseUrl}/api/meetings/end-meeting/${meetingId}`,{}).toPromise();
  }
}

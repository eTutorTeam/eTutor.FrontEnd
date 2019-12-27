import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ParentMeetingResponse} from "../../models/parent-meeting-response";
import {ParentMeetingAnswer} from "../../models/parent-meeting-answer";
import {ParentAuthorizationResponse} from "../../models/parent-authorization-response";

@Injectable({
  providedIn: 'root'
})


export class ParentMeetingService {

  constructor(private http: HttpClient) { }

  async getPendingMeetings(): Promise<ParentMeetingResponse[]> {
    return this.http.get<ParentMeetingResponse[]>(`${environment.apiBaseUrl}/api/parent-meetings/pending`).toPromise();
  }

  async respondToPendingMeeting(meetingId: number, answer: ParentMeetingAnswer): Promise<ParentAuthorizationResponse> {
    return this.http.post<ParentAuthorizationResponse>(`${environment.apiBaseUrl}/api/parent-meetings/${meetingId}/answer`, answer).toPromise();
  }

  async getMeetingSummary(meetingId: number): Promise<ParentMeetingResponse> {
    return this.http.get<ParentMeetingResponse>(`${environment.apiBaseUrl}/api/parent-meetings/${meetingId}/summary`).toPromise();
  }

}

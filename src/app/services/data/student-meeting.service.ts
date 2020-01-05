import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TutorSimpleResponse} from "../../models/tutor-simple-response";
import {MeetingResponse} from "../../models/meeting-response";

@Injectable({
  providedIn: 'root'
})
export class StudentMeetingService {

  constructor(private http: HttpClient) { }

  async getNotSelectedTutorsInMeetingForStudent(meetingId: string) {
    return this.http
        .get<TutorSimpleResponse[]>(`${environment.apiBaseUrl}/api/student-meetings/${meetingId}/not-selected-tutors`).toPromise();
  }

  async getRandomTutorForStudentInRejectedMeeting(meetingId: string): Promise<TutorSimpleResponse> {
    return this.http.get<TutorSimpleResponse>(`${environment.apiBaseUrl}/api/student-meetings/${meetingId}/random-tutor`).toPromise();
  }

  async cancelMeeting(meetingId: string): Promise<MeetingResponse> {
    return this.http.patch<MeetingResponse>(`${environment.apiBaseUrl}/api/student-meetings/${meetingId}/cancel`, {}).toPromise();
  }

  async rescheduleMeeting(meetingId: number, tutorId: number): Promise<MeetingResponse> {
    return this.http.patch<MeetingResponse>(`${environment.apiBaseUrl}/api/student-meetings/reschedule-tutor`, {meetingId, tutorId}).toPromise();
  }
}

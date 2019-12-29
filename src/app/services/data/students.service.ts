import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StudentMeeting } from 'src/app/models/student-meeting';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getActiveMeetings() {
    return this.httpClient.get<StudentMeeting[]>(`${this.apiBaseUrl}/api/meetings/all`);
  }
  async cacelmeetings(meetingId: number){


  }
}

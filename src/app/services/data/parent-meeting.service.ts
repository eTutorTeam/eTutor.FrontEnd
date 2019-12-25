import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ParentMeetingResponse} from "../../models/parent-meeting-response";

@Injectable({
  providedIn: 'root'
})


export class ParentMeetingService {

  constructor(private http: HttpClient) { }

  async getPendingMeetings(): Promise<ParentMeetingResponse[]>{
    return this.http.get<ParentMeetingResponse[]>(`${environment.apiBaseUrl}/parent-meetings/pending`).toPromise();
  }

}

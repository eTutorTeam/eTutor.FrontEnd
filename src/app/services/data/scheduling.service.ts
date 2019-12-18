import { Injectable } from '@angular/core';
import {MeetingRequest} from "../../models/meeting-request";

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  subjectId: number;
  startDateTime: Date;
  endDateTime: Date;
  tutorId: number;

  constructor() { }

  setSubjectAndDateData(subjectId: string, startDate: Date, endDate: Date) {
    this.subjectId = Number(subjectId);
    this.startDateTime = startDate;
    this.endDateTime = endDate;
  }

  setTutorForScheduling(tutorId: number){
    this.tutorId = tutorId;
  }

  getMeetingObject() {
    const meeting: MeetingRequest = {
      tutorId: this.tutorId,
      subjectId: this.subjectId,
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime
    };
    return meeting;
  }

  reset() {
    this.subjectId = null;
    this.startDateTime = null;
    this.endDateTime = null;
  }
}

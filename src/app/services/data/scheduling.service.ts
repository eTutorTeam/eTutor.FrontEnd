import { Injectable } from '@angular/core';
import {MeetingStudentRequest} from "../../models/meeting-student-request";

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
    const meeting: MeetingStudentRequest = {
      tutorId: this.tutorId,
      subjectId: this.subjectId,
      startDateTime: new Date(this.startDateTime),
      endDateTime: new Date(this.endDateTime)
    };
    return meeting;
  }

  reset() {
    this.subjectId = null;
    this.startDateTime = null;
    this.endDateTime = null;
  }
}

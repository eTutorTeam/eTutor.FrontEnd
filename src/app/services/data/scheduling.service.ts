import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  subjectId: number;
  startDateTime: Date;
  endDateTime: Date;

  constructor() { }

  setSubjectAndDateData(subjectId: string, startDate: Date, endDate: Date) {
    this.subjectId = Number(subjectId);
    this.startDateTime = startDate;
    this.endDateTime = endDate;
  }

  reset() {
    this.subjectId = null;
    this.startDateTime = null;
    this.endDateTime = null;
  }
}

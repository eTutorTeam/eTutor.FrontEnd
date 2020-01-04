import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MeetingStudentRequest} from "../../models/meeting-student-request";
import {MeetingSummary} from "../../models/meeting-summary";
import {MeetingStatusEnum} from "../../enums/meeting-status.enum";
import { MeetingResponse } from 'src/app/models/meeting-response';
import {CalendarMeetingEventModel} from "../../models/calendar-meeting-event-model";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MeetingService {

    calendarMeetings: BehaviorSubject<CalendarMeetingEventModel[]> = new BehaviorSubject([]);

    constructor(
        private http: HttpClient
    ) { }
    async createMeeting(meeting: MeetingStudentRequest) {
        return this.http.post(`${environment.apiBaseUrl}/api/meetings`, meeting).toPromise();
    }

    async getMeetingSummary(meetingId: number): Promise<MeetingSummary> {
        return this.http.get<MeetingSummary>(`${environment.apiBaseUrl}/api/meetings/${meetingId}/summary`).toPromise();
    }

    async getMeetingsForCalendar() {
        const meetings = await this.http.get<CalendarMeetingEventModel[]>(`${environment.apiBaseUrl}/api/meetings/calendar`).toPromise();
        this.calendarMeetings.next(meetings);
    }
}


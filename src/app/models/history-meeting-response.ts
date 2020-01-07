import {MeetingStatusEnum} from "../enums/meeting-status.enum";

export interface HistoryMeetingResponse {
    id: number;
    subject: string;
    tutorName: string;
    tutorImg: string;
    studentName: string;
    studentImg: string;
    scheduledDate: Date;
    startTime: Date;
    endTime: Date;
    status: MeetingStatusEnum;
}

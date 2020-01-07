export interface MeetingSummary {
    meetingId: number;
    studentName: string;
    studentImg: string;
    subjectName: string;
    meetingDate: Date;
    startTime: Date;
    endTime: Date;
    RealStartedDateTime: Date;
    locationSummary: string;
    longitude: number;
    latitude: number;
}

export interface MeetingSummary {
    meetingId: number;
    studentId: number;
    studentName: string;
    studentImg: string;
    subjectName: string;
    meetingDate: Date;
    startTime: Date;
    endTime: Date;
    locationSummary: string;
    longitude: number;
    latitude: number;
    studentRatings: number;
}

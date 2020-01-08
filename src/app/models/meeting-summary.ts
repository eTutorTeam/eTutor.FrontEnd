export interface MeetingSummary {
    meetingId: number;
    studentId: number;
    studentName: string;
    studentPhone: string;
    studentImg: string;
    subjectName: string;
    meetingDate: Date;
    startTime: Date;
    endTime: Date;
    RealStartedDateTime: Date;
    locationSummary: string;
    longitude: number;
    latitude: number;
    studentRatings: number;
    tutorId: number;
    tutorName: string;
    tutorImg: string;
    tutorRatings: number;
    tutorPhone: string;
}

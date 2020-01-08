export interface MeetingResponse {
    id: number;
    studentId: number;
    tutorId: number;
    tutorName: string;
    tutorImage: string;
    tutorContact: string;
    subjectId: number;
    subjectName: string;
    startDateTime: Date;
    endDateTime: Date;
    RealStartedDateTime: Date;
    status: number;
}



export interface MeetingStudentRequest {
    tutorId: number;
    subjectId: number;
    longitude?: number;
    latitude?: number;
    startDateTime: Date;
    endDateTime: Date;
}

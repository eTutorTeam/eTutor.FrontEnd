export interface MeetingRequest {
    tutorId: number;
    subjectId: number;
    longitude?: number;
    latitude?: number;
    startDateTime: Date;
    endDateTime: Date;
}

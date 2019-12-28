export interface Meeting{
    meetingId: number;
    studentId: number;
    tutorId: number;
    tutorName: string,
    tutorImage: string;
    subjectId: number;
    subjectName: number;
    startDateTime: Date;
    endDateTime: Date;
    status: number;
}
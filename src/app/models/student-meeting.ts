export interface StudentMeeting {
    id: number;
    studentId: number;
    tutorId: number;
    tutorName: string;
    tutorImage: string;
    subjectId: number;
    subjectName: string;
    startDateTime: string;
    endDateTime: string;
    status: number;
}

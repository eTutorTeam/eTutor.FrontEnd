export interface MeetingInProgressResponse {
    meetingId: number;
    studentId: number;
    studentName: string;
    studentPhone: string;
    studentImg: string;
    subjectName: string;
    studentRatings: number;
    startTime: Date;
    endTime: Date;
    tutorId: number;
    tutorName: string;
    tutorImg: string;
    tutorPhone: string;
    tutorRatings: number;
    realStartTime: Date;
}

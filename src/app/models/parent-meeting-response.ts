import {SubjectResponse} from "./subject-response";
import {TutorSimpleResponse} from "./tutor-simple-response";
import {StudentUserViewModel} from "./student-user-view-model";

export interface ParentMeetingResponse {
    id: number;
    subjectId: number;
    subject: SubjectResponse;
    studentId: number;
    student: StudentUserViewModel;
    tutorId: number;
    tutor: TutorSimpleResponse;
    startDateTime: Date;
    endDateTime: Date;
    status: number;
}

import {TutorSimpleResponse} from "./tutor-simple-response";
import {StudentUserViewModel} from "./student-user-view-model";
import {SubjectSimpleResponse} from "./subject-simple-response";

export interface CalendarMeetingEventModel {
    meetingId: number;
    startTime: Date;
    endTime: Date;
    title: string;
    allDay: boolean;
    tutor: TutorSimpleResponse;
    student: StudentUserViewModel;
    subject: SubjectSimpleResponse;
}

export interface CalendarEventModel {
    meetingId: number;
    startTime: Date;
    endTime: Date;
    title: string;
    allDay: boolean;
}

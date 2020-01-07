import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {CalendarComponent} from "ionic2-calendar/calendar";
import {Router} from "@angular/router";
import {PopoverController} from "@ionic/angular";
import {UserPopoverComponent} from "../user-popover/user-popover.component";
import {Plugins} from '@capacitor/core';
import {CalendarMeetingEventModel} from "../../models/calendar-meeting-event-model";
import {RoleTypes} from "../../enums/role-types.enum";
import {AccountService} from "../../services/accounts/account.service";
import {StudentsService} from "../../services/data/students.service";
import {MeetingService} from "../../services/data/meeting.service";
import {LoadingService} from "../../services/loading.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {Subscription} from "rxjs";

const {Modals} = Plugins;

@Component({
  selector: 'app-scheduled-meetings',
  templateUrl: './scheduled-meetings.component.html',
  styleUrls: ['./scheduled-meetings.component.scss'],
})
export class ScheduledMeetingsComponent implements OnInit, OnDestroy {

  @ViewChild(CalendarComponent, {static: true}) myCal: CalendarComponent;
  @Input() Title = 'Tutorías Agendadas';
  @Output() MeetingSelected = new EventEmitter<number>();

  eventSource: CalendarMeetingEventModel[] = [];
  subscriptions: Subscription[] = [];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  viewTitle: string;


  constructor(
      @Inject(LOCALE_ID) private locale: string,
      private meetingService: MeetingService,
      private accountService: AccountService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService
  ) {
  }

  ngOnInit() {
    this.getMeetings();
  }

  getMeetings() {
    this.getMeetingsRequest().catch(err => {
      this.toastNotificationService.presentErrorToast(err);
    });
    this.subscribeToMeetings();
  }

  subscribeToMeetings() {
   const sub = this.meetingService.calendarMeetings.subscribe(async (meetings) => {
      await this.processMeetingsForCalendar(meetings);
    }, error1 => {
      this.toastNotificationService.presentErrorToast(error1);
    });

   this.subscriptions.push(sub);
  }

  refresh() {
    this.loadingService.startLoading();
    this.getMeetingsRequest().then(res => {
      this.loadingService.stopLoading();
    }).catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  private async getMeetingsRequest() {
    await this.meetingService.getMeetingsForCalendar();
  }

  private async processMeetingsForCalendar(meetings: CalendarMeetingEventModel[]) {
    const roles = await this.accountService.getRolesForUser();
    const role = roles[0];

    switch (role) {
      case RoleTypes.Parent:
        this.eventSource = meetings.map(m => this.setMeetingTitleForParent(m));
        break;
      case RoleTypes.Tutor:
        this.eventSource = meetings.map(m => this.setMeetingTitleForTutor(m));
        break;
      default:
        this.eventSource = meetings.map(m => this.setMeetingsTitleForStudent(m));
    }
    this.myCal.loadEvents();
  }

  private setMeetingsTitleForStudent(event: CalendarMeetingEventModel): CalendarMeetingEventModel {
    const res: CalendarMeetingEventModel = {
      allDay: false,
      endTime: new Date(event.endTime),
      meetingId: event.meetingId,
      startTime: new Date(event.startTime),
      student: event.student,
      subject: event.subject,
      title: `${event.subject.name} - ${event.tutor.fullName}`,
      tutor: event.tutor
    };
    return res;
  }

  private setMeetingTitleForParent(event: CalendarMeetingEventModel): CalendarMeetingEventModel {
    const res: CalendarMeetingEventModel = {
      allDay: false,
      endTime: new Date(event.endTime),
      meetingId: event.meetingId,
      startTime: new Date(event.startTime),
      student: event.student,
      subject: event.subject,
      title: `${event.subject.name} - ${event.tutor.fullName} | ${event.student.fullName}`,
      tutor: event.tutor
    };
    return res;
  }

  private setMeetingTitleForTutor(event: CalendarMeetingEventModel): CalendarMeetingEventModel {
    const res: CalendarMeetingEventModel = {
      allDay: false,
      endTime: new Date(event.endTime),
      meetingId: event.meetingId,
      startTime: new Date(event.startTime),
      student: event.student,
      subject: event.subject,
      title: `${event.subject.name} - ${event.student.fullName}`,
      tutor: event.tutor
    };
    return res;
  }

  onCurrentDateChanged(event) {

  }

  onEventSelected(event: any) {
    this.MeetingSelected.emit(event.meetingId);
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(event) {

  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

}

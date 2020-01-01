import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output, ViewChild} from '@angular/core';
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

const {Modals} = Plugins;

let eveents: CalendarMeetingEventModel[] = [];

@Component({
  selector: 'app-scheduled-meetings',
  templateUrl: './scheduled-meetings.component.html',
  styleUrls: ['./scheduled-meetings.component.scss'],
})
export class ScheduledMeetingsComponent implements OnInit {

  @ViewChild(CalendarComponent, {static: true}) myCal: CalendarComponent;
  @Input() Title = 'Tutorías Agendadas';
  @Output() MeetingSelected = new EventEmitter<number>();

  eventSource: CalendarMeetingEventModel[] = [];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  viewTitle: string;

  constructor(
      @Inject(LOCALE_ID) private locale: string,
      private meetingService: MeetingService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService
  ) {}

  ngOnInit() {
    this.getMeetings();
  }

  getMeetings() {
    this.getMeetingsRequest().catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  private async getMeetingsRequest() {
    const events = await this.meetingService.getMeetingsForCalendar();
    this.eventSource = events.map((m: CalendarMeetingEventModel) => {
      const res: CalendarMeetingEventModel = {
        allDay: false,
        endTime: new Date(m.endTime),
        meetingId: m.meetingId,
        startTime: new Date(m.startTime),
        student: m.student,
        subject: m.subject,
        title: m.title,
        tutor: m.tutor
      };
      return res;
    });
    console.log(this.eventSource);
    this.myCal.loadEvents();
    //this.loadingService.stopLoading();
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

  doRefresh(event) {

  }

}

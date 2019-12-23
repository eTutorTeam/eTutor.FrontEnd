import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output, ViewChild} from '@angular/core';
import {CalendarComponent} from "ionic2-calendar/calendar";
import {Router} from "@angular/router";
import {PopoverController} from "@ionic/angular";
import {UserPopoverComponent} from "../user-popover/user-popover.component";
import {Plugins} from '@capacitor/core';
import {CalendarEventModel} from "../../models/calendar-event-model";

const {Modals} = Plugins;

@Component({
  selector: 'app-scheduled-meetings',
  templateUrl: './scheduled-meetings.component.html',
  styleUrls: ['./scheduled-meetings.component.scss'],
})
export class ScheduledMeetingsComponent implements OnInit {

  @ViewChild(CalendarComponent, {read: null, static: true}) myCal: CalendarComponent;
  @Input() Title = 'Tutorías Agendadas';
  @Output() MeetingSelected = new EventEmitter<number>();

  eventSource: CalendarEventModel[] = [
    {
      meetingId: 1,
      title: 'Tutoria Algebra',
      startTime: new Date(2019, 11, 10, 14),
      endTime: new Date(2019, 11, 10, 15),
      allDay: false
    },
    {
      meetingId: 2,
      title: 'Tutoria Logica simbolica',
      startTime: new Date(2019, 11, 25, 6),
      endTime: new Date(2019, 11, 25, 8),
      allDay: false
    }
  ];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  viewTitle: string;

  constructor(
      @Inject(LOCALE_ID) private locale: string
  ) {}


  async mostrarPop( event ) {
  }

  ngOnInit() {
    console.log(this.myCal);
  }

  onCurrentDateChanged(event) {

  }
  reloadSource(startTime, endTime) {

  }
  onEventSelected(event: any) {
    this.MeetingSelected.emit(event.meetingId);
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onTimeSelected(event) {

  }
  addEvent() {
    this.eventSource.push({
      meetingId: 3,
      title: 'Event - test',
      startTime: new Date(),
      endTime: new Date(2019, 12, 15),
      allDay: false
    });
    this.myCal.loadEvents();
  }

}

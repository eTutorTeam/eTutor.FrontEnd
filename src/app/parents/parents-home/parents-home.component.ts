import {Component, OnInit, ViewChild} from '@angular/core';
import {ScheduledMeetingsComponent} from "../../components/scheduled-meetings/scheduled-meetings.component";
import {MeetingService} from "../../services/data/meeting.service";

@Component({
  selector: 'app-parents-home',
  templateUrl: './parents-home.component.html',
  styleUrls: ['./parents-home.component.scss'],
})
export class ParentsHomeComponent implements OnInit {

  @ViewChild(ScheduledMeetingsComponent, {static: true}) meetingsCompontent: ScheduledMeetingsComponent;
  constructor(
      private meetingService: MeetingService
  ) { }

  ionViewDidEnter() {
    this.meetingService.getMeetingsForCalendar();
  }

  ngOnInit() {}

  meetingSelected(meetingId: number) {

  }

}

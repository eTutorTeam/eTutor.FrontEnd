import {Component, OnInit, ViewChild} from '@angular/core';
import {ScheduledMeetingsComponent} from "../../components/scheduled-meetings/scheduled-meetings.component";

@Component({
  selector: 'app-parents-home',
  templateUrl: './parents-home.component.html',
  styleUrls: ['./parents-home.component.scss'],
})
export class ParentsHomeComponent implements OnInit {

  @ViewChild(ScheduledMeetingsComponent, {static: true}) meetingsCompontent: ScheduledMeetingsComponent;
  constructor() { }

  ionViewDidEnter() {
    if (this.meetingsCompontent !== undefined) {
      this.meetingsCompontent.getMeetings();
    }
  }

  ngOnInit() {}

  meetingSelected(meetingId: number) {

  }

}

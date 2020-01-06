import {Component, OnInit, ViewChild} from '@angular/core';
import {ScheduledMeetingsComponent} from "../../components/scheduled-meetings/scheduled-meetings.component";
import {MeetingService} from "../../services/data/meeting.service";
import {ModalPagesService} from "../../services/modal-pages.service";
import {ParentMeetingSummaryComponent} from "../parent-meeting-summary/parent-meeting-summary.component";

@Component({
  selector: 'app-parents-home',
  templateUrl: './parents-home.component.html',
  styleUrls: ['./parents-home.component.scss'],
})
export class ParentsHomeComponent implements OnInit {

  @ViewChild(ScheduledMeetingsComponent, {static: true}) meetingsCompontent: ScheduledMeetingsComponent;
  constructor(
      private meetingService: MeetingService,
      private modalPageService: ModalPagesService
  ) { }

  ionViewDidEnter() {
    this.meetingService.getMeetingsForCalendar();
  }

  ngOnInit() {}

  meetingSelected(meetingId: number) {
    this.modalPageService.openModal(ParentMeetingSummaryComponent, {meetingId}).then(() => {
      this.ionViewDidEnter();
    });
  }

}

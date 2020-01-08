import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {TutorMeetingDetailComponent} from "../tutor-meeting-detail/tutor-meeting-detail.component";
import {ScheduledMeetingsComponent} from "../../../components/scheduled-meetings/scheduled-meetings.component";
import {MeetingService} from "../../../services/data/meeting.service";
import {ModalPagesService} from "../../../services/modal-pages.service";
import {CalendarMeetingSummaryComponent} from "../../../components/calendar-meeting-summary/calendar-meeting-summary.component";

@Component({
    selector: 'app-tutor-home',
    templateUrl: './tutor-home.component.html',
    styleUrls: ['./tutor-home.component.scss'],
})
export class TutorHomeComponent implements OnInit {

    @ViewChild(ScheduledMeetingsComponent, {static: true}) meetingsCompontent: ScheduledMeetingsComponent;

    constructor(
        private router: Router,
        private modalCtrl: ModalController,
        private modalPageService: ModalPagesService,
        private meetingService: MeetingService
    ) { }

    ionViewDidEnter() {
        this.meetingService.getMeetingsForCalendar();
    }

    ngOnInit() {}

    selectedMeeting(meetingId: number) {
        this.modalPageService.openModal(CalendarMeetingSummaryComponent, {meetingId}).then(() => {
            this.ionViewDidEnter();
        });
    }
}

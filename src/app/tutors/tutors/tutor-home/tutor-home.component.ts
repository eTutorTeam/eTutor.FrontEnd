import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {TutorMeetingDetailComponent} from "../tutor-meeting-detail/tutor-meeting-detail.component";
import {ScheduledMeetingsComponent} from "../../../components/scheduled-meetings/scheduled-meetings.component";
import {MeetingService} from "../../../services/data/meeting.service";

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
        private meetingService: MeetingService
    ) { }

    ionViewDidEnter() {
        this.meetingService.getMeetingsForCalendar();
    }

    ngOnInit() {}

    selectedMeeting(meetingId: number) {
        this.openDetailsModel(meetingId);
    }

    private async openDetailsModel(meetingId: number) {
        const modal = await this.modalCtrl.create({
            component: TutorMeetingDetailComponent,
            componentProps: {
                meetingId
            }
        });

        modal.present();
    }
}

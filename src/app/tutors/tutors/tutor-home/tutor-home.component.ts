import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {TutorMeetingDetailComponent} from "../tutor-meeting-detail/tutor-meeting-detail.component";

@Component({
  selector: 'app-tutor-home',
  templateUrl: './tutor-home.component.html',
  styleUrls: ['./tutor-home.component.scss'],
})
export class TutorHomeComponent implements OnInit {

  constructor(
      private router: Router,
      private modalCtrl: ModalController
  ) { }

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

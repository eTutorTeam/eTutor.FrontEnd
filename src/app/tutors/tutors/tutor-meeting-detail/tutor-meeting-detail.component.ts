import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-tutor-meeting-detail',
  templateUrl: './tutor-meeting-detail.component.html',
  styleUrls: ['./tutor-meeting-detail.component.scss'],
})
export class TutorMeetingDetailComponent implements OnInit {

  @Input() meetingId: number;
  constructor(
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

   closeModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}

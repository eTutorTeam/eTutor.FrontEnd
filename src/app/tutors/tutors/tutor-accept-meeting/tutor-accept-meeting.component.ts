import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-tutor-accept-meeting',
  templateUrl: './tutor-accept-meeting.component.html',
  styleUrls: ['./tutor-accept-meeting.component.scss'],
})
export class TutorAcceptMeetingComponent implements OnInit {

  constructor(
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {}


  closeModal() {
    this.modalCtrl.dismiss();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-stars-rating-modal',
  templateUrl: './stars-rating-modal.page.html',
  styleUrls: ['./stars-rating-modal.page.scss'],
})
export class StarsRatingModalPage implements OnInit {

  starsRating = [0];
  buttonDisabled = true;
  constructor(private modalCtrl: ModalController) { }

  @ViewChild('rating', {static: true} ) rating: any;

  ngOnInit() {

  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

  logRatingChange(rating) {
    console.log("changed rating: ", rating);
    console.log("this.starsRating: ", this.starsRating);
    this.buttonDisabled = false;
    // do your stuff
  }
  SendCalification() {
    console.log("Sending Calification");
    this.dismiss();

  }
}

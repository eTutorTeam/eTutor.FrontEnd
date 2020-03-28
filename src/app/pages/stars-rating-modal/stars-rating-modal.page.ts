import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalPagesService} from "../../services/modal-pages.service";
import {AccountService} from "../../services/accounts/account.service";
import {RoleTypes} from "../../enums/role-types.enum";
import {RatingsService} from "../../services/data/ratings.service";
import {LoadingService} from "../../services/loading.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {RatingRequest} from "../../models/rating-request";
import {MeetingService} from "../../services/data/meeting.service";
import {MeetingSummary} from "../../models/meeting-summary";

@Component({
  selector: 'app-stars-rating-modal',
  templateUrl: './stars-rating-modal.page.html',
  styleUrls: ['./stars-rating-modal.page.scss'],
})
export class StarsRatingModalPage implements OnInit {

  starsRating = 0;
  meetingId: number;
  meeting: MeetingSummary;
  isTutor = false;
  buttonDisabled = true;

  constructor(
      private modalPageService: ModalPagesService,
      private accountService: AccountService,
      private ratingsService: RatingsService,
      private meetingService: MeetingService,
      private loadingService: LoadingService,
      private toastNotificationService: ToastNotificationService
  ) { }

  @ViewChild('rating', {static: true} ) rating: any;

  get userType() {
    return this.isTutor ? 'Tutor' : 'Estudiante';
  }

  get userTypeInverted() {
    return !this.isTutor ? 'Tutor' : 'Estudiante';
  }

  get avatarImg() {
    return this.isTutor ? this.meeting.studentImg : this.meeting.tutorImg;
  }

  get name() {
    return this.isTutor ? this.meeting.studentName : this.meeting.tutorName;
  }

  ngOnInit() {
    this.getMeeting().catch(err => {
      this.toastNotificationService.presentErrorToast(err);
      this.loadingService.stopLoading();
    });
  }

  private async getUserRole() {
    const roles = await this.accountService.getRolesForUser();
    const role = roles[0];
    this.isTutor = role === RoleTypes.Tutor;
  }

  private async getMeeting() {
    await this.getUserRole();
    await this.loadingService.startLoading();
    this.meeting = await this.meetingService.getMeetingSummary(this.meetingId);
    this.loadingService.stopLoading();
  }

  dismiss() {
    this.modalPageService.closeModal();
  }

  logRatingChange(rating) {
    this.starsRating = rating * 2;
    this.buttonDisabled = false;
    console.log("changed rating: ", this.starsRating);
  }


  sendRatings() {
    this.sendRatingRequest().catch(err => {
      this.loadingService.stopLoading();
      this.toastNotificationService.presentErrorToast(err);
    });
  }

  private async sendRatingRequest() {
    this.loadingService.startLoading(`Calificando al ${this.userTypeInverted}`);
    const userId = !this.isTutor ? this.meeting.tutorId : this.meeting.studentId;
    const data: RatingRequest = {
      userId,
      meetingId: this.meetingId,
      calification: this.starsRating
    };
    await this.ratingsService.createRating(data);
    this.loadingService.stopLoading();
    this.dismiss();
  }
}

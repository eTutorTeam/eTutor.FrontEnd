import {Component, OnInit, ViewChild} from '@angular/core';
import {IonItemSliding} from '@ionic/angular';
import {MeetingService} from 'src/app/services/data/meeting.service';
import {LoadingService} from 'src/app/services/loading.service';
import {ToastNotificationService} from 'src/app/services/toast-notification.service';
import {Router} from '@angular/router';
import {AccountService} from 'src/app/services/accounts/account.service';
import {RoleTypes} from 'src/app/enums/role-types.enum';
import {TutorsService} from 'src/app/services/data/tutors.service';
import {StudentsService} from 'src/app/services/data/students.service';
import {UserService} from 'src/app/services/accounts/user.service';
import {ActiveMeetingService} from "../../services/active-meeting/active-meeting.service";
import {MeetingInProgressResponse} from "../../models/meeting-in-progress-response";
import * as moment from "moment";
import {setInterval} from "timers";


@Component({
  selector: 'app-meeting-in-course',
  templateUrl: './meeting-in-course.page.html',
  styleUrls: ['./meeting-in-course.page.scss']
})
export class MeetingInCoursePage implements OnInit {

  meetingId: number;
  currentMeeting: MeetingInProgressResponse;
  startTime: Date;
  isStudent: boolean;
  time: string;
  interval: any;

  @ViewChild('slidingItem', {static: true}) itemSliding: IonItemSliding;

  constructor(
    private meetingService: MeetingService,
    private tutorService: TutorsService,
    private studentService: StudentsService,
    private loadingService: LoadingService,
    private userService: UserService,
    private activeMeetingService: ActiveMeetingService,
    private toastService: ToastNotificationService,
    private router: Router,
    private accountService: AccountService) {
   }

  get finishMeetingTitle() {
    return this.isStudent ? 'Cancelar' : 'Terminar';
  }

  get slideTitle() {
    return this.isStudent ? 'Cancelada' : 'Terminada';
  }

  get avatarImg() {
    return this.isStudent ? this.currentMeeting.studentImg : this.currentMeeting.tutorImg;
  }

  get name() {
    return this.isStudent ? this.currentMeeting.studentName : this.currentMeeting.tutorName;
  }

  get ratings() {
    return this.isStudent ? this.currentMeeting.studentRatings : this.currentMeeting.tutorRatings;
  }

  get realStartedTime() {
    const date = this.startTime;
    return moment(date).format('ddd D MMMM YYYY, h:mm A');
  }

  get endTime() {
    const date = new Date(this.currentMeeting.endTime);
    return moment(date).format('ddd D MMMM YYYY, h:mm A');
  }

  ngOnInit() {
    this.performRequests().catch(err => {
      this.loadingService.stopLoading();
      this.activeMeetingService.goToHome();
    });
  }

  private async performRequests() {
    this.loadingService.startLoading('Cargando datos actualizados tutoría');
    await this.getMeetingData();
    await this.getUserRole();
    this.loadingService.stopLoading();
  }

  private async getMeetingData() {
    this.currentMeeting = await this.meetingService.getMeetingInProgress();
    this.startTime = new Date(this.currentMeeting.realStartTime);
    this.meetingId = this.currentMeeting.meetingId;
    this.startTimer();
  }

  private startTimer() {
    const start = this.startTime;
    this.meetingCounter(start);
    this.interval = setInterval(() => {
      this.meetingCounter(start);
    }, 60000);
  }

  private meetingCounter(startTime: Date) {
    const start = moment(startTime);
    const now = moment();
    const calculation = moment.duration(now.diff(start));
    const elapsed = calculation.asMinutes();
    const hours = Math.floor(elapsed / 60);
    const minutes = Math.floor(elapsed - (hours * 60));
    this.time = `${hours}:${minutes}`;
  }

  private async getUserRole() {
    const roles = await this.accountService.getRolesForUser();
    const role = roles[0];
    this.isStudent = role === RoleTypes.Student;
  }

  finishMeeting() {
    this.finishMeetingRequest().catch(err => {
      this.toastService.presentErrorToast(err);
      this.loadingService.stopLoading();
    });
  }

  private async finishMeetingRequest() {
    this.itemSliding.close();
    this.isStudent ? await this.finishMeetingStudent() : await this.finisheMeetingTutor();
    this.activeMeetingService.goToHome();
  }

  private async finishMeetingStudent() {
    await this.loadingService.startLoading('Cancelando la tutoría')
    await this.meetingService.endMeeting(this.meetingId);
    this.loadingService.stopLoading();
    await this.toastService.presentToast('Cancelado', 'Se ha Cancelado la tutoría con éxito');
  }

  private async finisheMeetingTutor() {
    await this.loadingService.startLoading('Terminando la tutoría')
    await this.meetingService.endMeeting(this.meetingId);
    this.loadingService.stopLoading();
    await this.toastService.presentToast('Completado', 'Se ha completado la tutoría con éxito');
  }
}

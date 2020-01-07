import { Component, OnInit, ViewChild } from '@angular/core';
import { IonItemSliding, IonDatetime } from '@ionic/angular';
import { MeetingService } from 'src/app/services/data/meeting.service';
import { LoadingService } from 'src/app/services/loading.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/accounts/account.service';
import { RoleTypes } from 'src/app/enums/role-types.enum';
import { TutorsService } from 'src/app/services/data/tutors.service';
import { StudentsService } from 'src/app/services/data/students.service';
import { UserService } from 'src/app/services/accounts/user.service';
import { MeetingResponse } from 'src/app/models/meeting-response';


@Component({
  selector: 'app-meeting-in-course',
  templateUrl: './meeting-in-course.page.html',
  styleUrls: ['./meeting-in-course.page.scss']
})
export class MeetingInCoursePage implements OnInit {

  meetingId = 0;
  avatarImg: string;
  isStudent: boolean;
  name: string;
  realStartedTime: Date;
  endTime: Date;
  subjectName: string;
  isTutor: boolean;
  ratingSummary = 0;
  isParent: boolean;

  @ViewChild('slidingItem', {static:true}) itemSliding: IonItemSliding; 
  constructor(
    private meetingService: MeetingService,
    private tutorService: TutorsService,
    private studentService: StudentsService,
    private loadingService: LoadingService,
    private userService: UserService,
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


  ngOnInit() {
    this.isStudent = this.accountService.user.roles.includes(RoleTypes.Student);
    this.meetingService.getMeetingInCourse().then(resp =>{
      this.meetingId = resp.id;
      this.loadMeetingData();
    });   
  }

  loadMeetingData(){
    if (this.isStudent) {
      // load tutor info

      this.meetingService.getMeetingSummary(this.meetingId).then(resp => {
      this.avatarImg = resp.tutorImg;
      this.name = resp.tutorName;
      this.subjectName = resp.subjectName;
      this.realStartedTime = resp.RealStartedDateTime;
      this.endTime = resp.endTime;
      this.ratingSummary = resp.tutorRatings
    });
  }
  else{
     // load student info
    this.meetingService.getMeetingSummary(this.meetingId).then(resp => {
      this.avatarImg = resp.studentImg;
      this.name = resp.studentName;
      this.subjectName = resp.subjectName;
      this.realStartedTime = resp.RealStartedDateTime;
      this.endTime = resp.endTime;
      this.ratingSummary = resp.studentRatings;
    });
  }
  }
  finishMeeting() {

    this.itemSliding.close();
    if(this.isStudent){
      this.loadingService.startLoading('Cancelando la tutoría')
      this.meetingService.cancelMeeting(this.meetingId).then(resp => {
        this.loadingService.stopLoading();
        this.toastService.presentToast('Cancelado', 'Se ha Cancelado la tutoría con éxito');  
      });
    }
    else{      
    this.loadingService.startLoading('Terminando la tutoría')
    this.meetingService.endMeeting(this.meetingId).then(resp => {
      this.loadingService.stopLoading();
      this.toastService.presentToast('Completado', 'Se ha completado la tutoría con éxito');
    });
    }
    this.router.navigate(['/home']);
  }
}

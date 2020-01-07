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


@Component({
  selector: 'app-meeting-in-course',
  templateUrl: './meeting-in-course.page.html',
  styleUrls: ['./meeting-in-course.page.scss']
})
export class MeetingInCoursePage implements OnInit {

  meetingId: number;
  avatarImg: string;
  isStudent: boolean;
  name: string;
  realStartedTime: Date;
  endTime: Date;
  subjectName: string;
  isTutor: boolean;
  ratingSummary = 3.5;
  isParent: boolean;

  @ViewChild('slidingItem', {static:true}) itemSliding: IonItemSliding; 
  constructor(
    private meetingService: MeetingService,
    private tutorService: TutorsService,
    private studentService: StudentsService,
    private loadingService: LoadingService,
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
    this.meetingId = 1;
    
    if (this.isStudent) {
        // load tutor info
      this.meetingService.getMeeting(this.meetingId).then(resp => {
        this.avatarImg = resp.tutorImage;
        this.name = resp.tutorName;
        this.subjectName = resp.subjectName;
        this.realStartedTime = resp.RealStartedDateTime;
        this.endTime = resp.endDateTime;
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
      });
    }
  }

  get stars(): string[] {
    const arr: string[] = [];
    let rat = this.ratingSummary;
    for (let i = 1; i <= 5; i++) {
      if (rat === 0.5) {
        rat--;
        arr.push('star-half');
        continue;
      }

      if (rat <= 0) {
        arr.push('star-outline');
        continue;
      }

      arr.push('star');
      rat--;
    }
    return arr;
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

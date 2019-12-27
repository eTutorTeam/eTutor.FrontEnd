import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { UserPopoverComponent } from '../../components/user-popover/user-popover.component';
import { AccountService } from 'src/app/services/accounts/account.service';
import { RoleTypes } from 'src/app/enums/role-types.enum';
import { StudentsService } from 'src/app/services/data/students.service';
import { MeetingPopoverComponent } from '../../components/meeting-popover/meeting-popover.component';
import { AlertController } from '@ionic/angular';
import { formatDate, FormatWidth } from '@angular/common';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { callCordovaPlugin } from '@ionic-native/core/decorators/common';
import { CallNumber } from '@ionic-native/call-number/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(CalendarComponent, {read: null, static: true}) myCal: CalendarComponent;

  eventSource = [
    {
      title: 'Tutoria Algebra',
      startTime: new Date(2019, 11, 10, 14),
      endTime: new Date(2019, 11, 10, 15),
      allDay: false,
      contact:"0000000",
      id:0
    },
    {
      title: 'Tutoria Logica simbolica',
      startTime: new Date(2019, 11, 25, 6),
      endTime: new Date(2019, 11, 25, 8),
      allDay: false,
      contact:"0000000",
      id:0
    }
  ];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  viewTitle: string;

  constructor(
    public router: Router,
    
    private popoverCtrl: PopoverController,
    @Inject(LOCALE_ID) private locale: string,
    private accountService: AccountService,
    private studentService: StudentsService,
    public alertController: AlertController,
    private callNumber: CallNumber
    ) {}
  

  async mostrarPop( event ) {
    const popover = await this.popoverCtrl.create({
      component: MeetingPopoverComponent,
      event,
      mode: 'ios',
    });

    await popover.present();
  }

  ngOnInit() {
  
  }
  ionViewWillEnter() {
    this.getMeetings();
  }
  getMeetings() {
    this.eventSource = [];
    if (this.accountService.user.roles.includes(RoleTypes.Student)) {
      this.studentService.getActiveMeetings().toPromise().then(resp => {
        resp.forEach(meeting => {
         
          this.eventSource.push({
            title: `Tutoría de ${meeting.subjectName} con ${meeting.tutorName}`,
            startTime: new Date( meeting.startDateTime ),
            endTime: new Date( meeting.endDateTime ),
            allDay: false,
            contact:"000000",
            id: (meeting.id)
            
            
          });
        });
      });
    }
    this.myCal.loadEvents();
  }

  onCurrentDateChanged(event) {

  }
  reloadSource(startTime, endTime) {

  }
   async onEventSelected(event) {
     
     
    const alert = await this.alertController.create({
      header: ` informacion `,
      subHeader: ''+ (event.title),
      message:'desde '+(event.startTime)+ "<br><br> Hasta  "+ (event.endTime) ,
      mode:'ios',
      buttons: [
       
        {text:'Contactar tutor',
        cssClass:'call',
        handler: () => {
          console.log()
          this.calltutor(event.contact);}
        },

        {text:'Cancelar tutoria',
    
        cssClass:'secundary',
        handler: () => {
          console.log(event.id)
          this.cancelmeetingmwarnig(event.id)}
        },
        
        {text:'Cerrar',
        cssClass:'primary'},
      
      ]
    
    
    });

    await alert.present();

  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
}
  onTimeSelected(event) {

  }
  addEvent() {
    this.eventSource.push({
      title: 'Event - test',
      startTime: new Date(),
      endTime: new Date(2019, 12, 15),
      allDay: false,
      contact:"00",
      id:0
    });
    this.myCal.loadEvents();
  }
  calltutor(num){
    this.callNumber.callNumber(num, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  async cancelmeetingmwarnig(idt){
    const alert = await this.alertController.create({
      header: 'CANCELAR TUTORIA',
      subHeader: 'Estas seguro?',
      mode:'ios',
      buttons: [
                {
                  text:"si",
                  cssClass:'secundary',
                  handler: () =>  
                  {
                    console.log(idt);
                    this.cancelmeeting(idt);
                  }    
                },
                {
                  text:'no',
                  cssClass:'primary'
                }
              ]
    }); 
    await alert.present();



  }
  cancelmeeting(idt){
    console.log("cancelada")
  }
}

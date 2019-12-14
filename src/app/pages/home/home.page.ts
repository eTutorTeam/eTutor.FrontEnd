import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { UserPopoverComponent } from '../../components/user-popover/user-popover.component';

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
      allDay: false
    },
    {
      title: 'Tutoria Logica simbolica',
      startTime: new Date(2019, 11, 25, 6),
      endTime: new Date(2019, 11, 25, 8),
      allDay: false
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
    @Inject(LOCALE_ID) private locale: string
  ) {}


  async mostrarPop( event ) {
    const popover = await this.popoverCtrl.create({
      component: UserPopoverComponent,
      event,
      mode: 'ios',
    });

    await popover.present();
  }

  ngOnInit() {
    console.log(this.myCal);
  }

  onCurrentDateChanged(event) {

  }
  reloadSource(startTime, endTime) {

  }
  onEventSelected(event) {

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
      allDay: false
    });
    this.myCal.loadEvents();
  }

}

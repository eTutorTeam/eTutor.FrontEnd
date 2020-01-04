import { Injectable } from '@angular/core';
import {LocalNotifications, ELocalNotificationTriggerUnit} from '@ionic-native/local-notifications/ngx';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor(private localNotifications: LocalNotifications) { }

  scheduleNotification(subject: string, tutor: string, startTime: Date){
    var start = new Date(startTime);
    this.localNotifications.schedule({
      id: new Date().getUTCMilliseconds(),
      title: `Recordatorio: Tutoría de ${subject}`,
      text: `Su tutoria de ${subject} pautada para las ${moment(start).format('h:mm')} con el tutor ${tutor} iniciara en 1 hora`,
      trigger: {at: new Date(start.getHours())}
    });
  }
}

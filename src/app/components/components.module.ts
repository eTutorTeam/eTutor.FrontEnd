import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserPopoverComponent } from './user-popover/user-popover.component';
import {EtutorLogoComponent} from './etutor-logo/etutor-logo.component';
import {ScheduledMeetingsComponent} from "./scheduled-meetings/scheduled-meetings.component";
import {NgCalendarModule} from "ionic2-calendar";
import {SimpleHeaderComponent} from "./menu/simple-header/simple-header.component";
import {TutorAcceptMeetingComponent} from "../tutors/tutors/tutor-accept-meeting/tutor-accept-meeting.component";
import {ParentApproveMeetingModalComponent} from "../parents/parent-approve-meeting-modal/parent-approve-meeting-modal.component";
import {AvatarModule} from "ngx-avatar";
import {StudentTutorsListComponent} from "../students/student-tutors-list/student-tutors-list.component";
import {StarsRatingsComponent} from "./stars-ratings/stars-ratings.component";
import {CalendarMeetingSummaryComponent} from "./calendar-meeting-summary/calendar-meeting-summary.component";
import {ParentMeetingSummaryComponent} from "../parents/parent-meeting-summary/parent-meeting-summary.component";
import {StarsRatingModalPage} from "../pages/stars-rating-modal/stars-rating-modal.page";
import {StarRatingModule} from "ionic4-star-rating";


const components = [
    MenuComponent,
    HeaderComponent,
    UserPopoverComponent,
    EtutorLogoComponent,
    ScheduledMeetingsComponent,
    SimpleHeaderComponent,
    TutorAcceptMeetingComponent,
    ParentApproveMeetingModalComponent,
    StudentTutorsListComponent,
    ParentMeetingSummaryComponent,
    StarsRatingsComponent,
    CalendarMeetingSummaryComponent,
    StarsRatingModalPage
];

@NgModule({
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ],
    entryComponents: [
        TutorAcceptMeetingComponent,
        ParentApproveMeetingModalComponent,
        CalendarMeetingSummaryComponent,
        ParentMeetingSummaryComponent,
        StarsRatingModalPage
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        NgCalendarModule,
        AvatarModule,
        StarRatingModule
    ]
})
export class ComponentsModule { }

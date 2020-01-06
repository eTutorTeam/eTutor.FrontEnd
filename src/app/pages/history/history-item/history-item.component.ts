import {Component, Input, OnInit} from '@angular/core';
import {HistoryMeetingResponse} from "../../../models/history-meeting-response";
import {RoleTypes} from "../../../enums/role-types.enum";
import * as moment from "moment";
import {getTextForMeetingStatus} from "../../../helpers/HelperFunctions";
import {MeetingStatusEnum} from "../../../enums/meeting-status.enum";

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
})
export class HistoryItemComponent implements OnInit {

  @Input() meeting: HistoryMeetingResponse;
  @Input() userRole: RoleTypes;
  roleTypes = RoleTypes;
  statuses = MeetingStatusEnum;

  constructor() { }

  ngOnInit() {}

  get startTime() {
    const date = new Date(this.meeting.scheduledDate);
    return moment(date).format('LLLL h:mm a');
  }

  get duration() {
    const startDate = moment(new Date(this.meeting.startTime));
    const endDate = moment(new Date(this.meeting.endTime));

    const calculation = moment.duration(endDate.diff(startDate));
    return calculation.humanize(true);
  }

  get meetingStatus() {
    const status = this.meeting.status;
    return getTextForMeetingStatus(status);
  }
}

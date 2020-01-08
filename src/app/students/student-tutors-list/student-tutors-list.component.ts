import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TutorSimpleResponse} from "../../models/tutor-simple-response";

@Component({
  selector: 'app-student-tutors-list',
  templateUrl: './student-tutors-list.component.html',
  styleUrls: ['./student-tutors-list.component.scss'],
})
export class StudentTutorsListComponent implements OnInit {

  @Input() tutors: TutorSimpleResponse[] = [];
  @Output() selected = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  tutorSelected(id: number) {
    this.selected.emit(id);
  }
}

import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {AccountService} from '../../services/accounts/account.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.page.html',
  styleUrls: ['./student-manager.page.scss'],
})
export class StudentManagerPage implements OnInit {

  studentList: Observable<UserResponse[]>;

  constructor(private dataService: DataService,
              private accountService: AccountService) { }

  ngOnInit() {
    const userId = this.accountService.user.uId;
    this.studentList = this.dataService.getChildren(userId);
  }

    toggleStudentState(event, studentId) {
      const newState: boolean = event.detail.checked;
      this.dataService.toogleUser(studentId).toPromise();
      console.log('this');
    }

}

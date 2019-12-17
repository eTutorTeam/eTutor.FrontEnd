import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.page.html',
  styleUrls: ['./subjects-list.page.scss'],
})
export class SubjectsListPage implements OnInit {

 //lista: Array<any>=[
  //{name:"Matematicas"},
  //{name:"Fisica"},
  //{name:"Sociales"},
  //]

 items: Observable<any[]>;
 

 constructor(private dataService: DataService,public router: Router,) { }

 ngOnInit() {
   this.items = this.dataService.getsubjectslist();
  }
  goTotutorlist() {
    this.router.navigate(['tutor-d-list']);}
}

import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tutor-d-list',
  templateUrl: './tutor-d-list.page.html',
  styleUrls: ['./tutor-d-list.page.scss'],
})
export class TutorDListPage implements OnInit {
 

  items: Observable<any[]>;

 constructor(private dataService: DataService) { }

 ngOnInit() {
  this.items = this.dataService.gettutorbysubjects();
 }

}

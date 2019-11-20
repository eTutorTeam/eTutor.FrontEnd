import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  items: Observable<any[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.items = this.dataService.getHistoryData();
  }





}

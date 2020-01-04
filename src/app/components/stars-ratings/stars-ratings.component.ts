import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stars-ratings',
  templateUrl: './stars-ratings.component.html',
  styleUrls: ['./stars-ratings.component.scss'],
})
export class StarsRatingsComponent implements OnInit {

  @Input() ratings: number;
  constructor() { }

  ngOnInit() {}

  get stars(): string[] {
    const arr: string[] = [];
    let rat = this.ratings;
    for (let i = 1; i <= 5; i++) {
      if (rat === 0.5) {
        rat--;
        arr.push('star-half');
        continue;
      }

      if (rat <= 0) {
        arr.push('star-outline');
        continue;
      }

      arr.push('star');
      rat--;
    }
    return arr;
  }

}


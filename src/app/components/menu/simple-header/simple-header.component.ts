import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-simple-header',
  templateUrl: './simple-header.component.html',
  styleUrls: ['./simple-header.component.scss'],
})
export class SimpleHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() hiddenClose = false;
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  closeAction() {
    this.close.emit();
  }
}

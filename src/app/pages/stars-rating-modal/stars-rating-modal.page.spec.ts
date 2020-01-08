import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsRatingModalPage } from './stars-rating-modal.page';

describe('StarsRatingModalPage', () => {
  let component: StarsRatingModalPage;
  let fixture: ComponentFixture<StarsRatingModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsRatingModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsRatingModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

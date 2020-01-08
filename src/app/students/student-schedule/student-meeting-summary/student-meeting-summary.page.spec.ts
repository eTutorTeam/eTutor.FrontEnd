import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMeetingSummaryPage } from './student-meeting-summary.page';

describe('StudentMeetingSummaryPage', () => {
  let component: StudentMeetingSummaryPage;
  let fixture: ComponentFixture<StudentMeetingSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMeetingSummaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMeetingSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

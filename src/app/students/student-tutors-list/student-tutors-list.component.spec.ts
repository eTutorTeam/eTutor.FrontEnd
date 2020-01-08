import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTutorsListComponent } from './student-tutors-list.component';

describe('StudentTutorsListComponent', () => {
  let component: StudentTutorsListComponent;
  let fixture: ComponentFixture<StudentTutorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTutorsListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTutorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

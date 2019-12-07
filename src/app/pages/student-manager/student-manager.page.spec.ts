import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentManagerPage } from './student-manager.page';

describe('StudentManagerPage', () => {
  let component: StudentManagerPage;
  let fixture: ComponentFixture<StudentManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentManagerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTutorSelectorPage } from './student-tutor-selector.page';

describe('StudentTutorSelectorPage', () => {
  let component: StudentTutorSelectorPage;
  let fixture: ComponentFixture<StudentTutorSelectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTutorSelectorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTutorSelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

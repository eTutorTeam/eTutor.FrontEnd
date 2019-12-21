import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDatetimeSelectorPage } from './student-datetime-selector.page';

describe('StudentDatetimeSelectorPage', () => {
  let component: StudentDatetimeSelectorPage;
  let fixture: ComponentFixture<StudentDatetimeSelectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDatetimeSelectorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDatetimeSelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

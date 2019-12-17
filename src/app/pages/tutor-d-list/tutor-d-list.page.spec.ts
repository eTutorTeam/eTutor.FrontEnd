import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDListPage } from './tutor-d-list.page';

describe('TutorDListPage', () => {
  let component: TutorDListPage;
  let fixture: ComponentFixture<TutorDListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorDListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

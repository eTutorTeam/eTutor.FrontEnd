import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsListPage } from './subjects-list.page';

describe('SubjectsListPage', () => {
  let component: SubjectsListPage;
  let fixture: ComponentFixture<SubjectsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

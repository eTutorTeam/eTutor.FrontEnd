import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTutorPage } from './login-tutor.page';

describe('LoginTutorPage', () => {
  let component: LoginTutorPage;
  let fixture: ComponentFixture<LoginTutorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTutorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

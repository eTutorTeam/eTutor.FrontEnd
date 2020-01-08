import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsHomeComponent } from './parents-home.component';

describe('ParentsHomeComponent', () => {
  let component: ParentsHomeComponent;
  let fixture: ComponentFixture<ParentsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentsHomeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

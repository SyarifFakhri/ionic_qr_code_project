import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailPage } from './class-detail.page';

describe('ClassDetailPage', () => {
  let component: ClassDetailPage;
  let fixture: ComponentFixture<ClassDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

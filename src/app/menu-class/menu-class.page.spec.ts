import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuClassPage } from './menu-class.page';

describe('MenuClassPage', () => {
  let component: MenuClassPage;
  let fixture: ComponentFixture<MenuClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuClassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

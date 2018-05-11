import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturntoSignupComponent } from './returnto-signup.component';

describe('ReturntoSignupComponent', () => {
  let component: ReturntoSignupComponent;
  let fixture: ComponentFixture<ReturntoSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturntoSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturntoSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelonnoteComponent } from './labelonnote.component';

describe('LabelonnoteComponent', () => {
  let component: LabelonnoteComponent;
  let fixture: ComponentFixture<LabelonnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelonnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelonnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

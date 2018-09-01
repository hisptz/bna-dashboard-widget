import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFilledInputComponent } from './auto-filled-input.component';

describe('AutoFilledInputComponent', () => {
  let component: AutoFilledInputComponent;
  let fixture: ComponentFixture<AutoFilledInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoFilledInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFilledInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

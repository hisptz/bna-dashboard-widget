import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBoxInputComponent } from './select-box-input.component';

describe('SelectBoxInputComponent', () => {
  let component: SelectBoxInputComponent;
  let fixture: ComponentFixture<SelectBoxInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBoxInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBoxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

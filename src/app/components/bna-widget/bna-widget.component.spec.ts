import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BnaWidgetComponent } from './bna-widget.component';

describe('BnaWidgetComponent', () => {
  let component: BnaWidgetComponent;
  let fixture: ComponentFixture<BnaWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BnaWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BnaWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

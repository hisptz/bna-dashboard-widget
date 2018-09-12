import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataItemDeleteComponent } from './data-item-delete.component';

describe('DataItemDeleteComponent', () => {
  let component: DataItemDeleteComponent;
  let fixture: ComponentFixture<DataItemDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataItemDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataItemDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTrackerComponent } from './model-tracker.component';

describe('ModelTrackerComponent', () => {
  let component: ModelTrackerComponent;
  let fixture: ComponentFixture<ModelTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

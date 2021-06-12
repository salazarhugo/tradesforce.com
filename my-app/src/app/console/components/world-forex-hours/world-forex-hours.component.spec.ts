import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldForexHoursComponent } from './world-forex-hours.component';

describe('WorldForexHoursComponent', () => {
  let component: WorldForexHoursComponent;
  let fixture: ComponentFixture<WorldForexHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldForexHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldForexHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

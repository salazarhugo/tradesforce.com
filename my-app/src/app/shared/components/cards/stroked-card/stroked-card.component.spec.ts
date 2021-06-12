import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrokedCardComponent } from './stroked-card.component';

describe('StrokedCardComponent', () => {
  let component: StrokedCardComponent;
  let fixture: ComponentFixture<StrokedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrokedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrokedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

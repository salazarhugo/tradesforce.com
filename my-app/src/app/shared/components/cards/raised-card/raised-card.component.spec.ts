import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedCardComponent } from './raised-card.component';

describe('RaisedCardComponent', () => {
  let component: RaisedCardComponent;
  let fixture: ComponentFixture<RaisedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTradingComponent } from './home-trading.component';

describe('HomeTradingComponent', () => {
  let component: HomeTradingComponent;
  let fixture: ComponentFixture<HomeTradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
